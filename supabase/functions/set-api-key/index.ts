import { corsHeaders } from "../_shared/cors.ts";
import { createUserClient, createServiceClient } from "../_shared/supabase.ts";
import { encrypt } from "../_shared/crypto.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    // 1. Authenticate
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing Authorization header." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const userClient = createUserClient(authHeader);
    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired token." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 2. Parse body
    const { api_key } = await req.json();

    // Handle deletion — if api_key is null or empty, remove it
    if (!api_key) {
      const serviceClient = createServiceClient();
      const { error } = await serviceClient
        .from("profiles")
        .update({ api_key_encrypted: null })
        .eq("id", user.id);

      if (error) {
        console.error("Failed to remove API key:", error);
        return new Response(
          JSON.stringify({ error: "Failed to remove API key." }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      return new Response(
        JSON.stringify({ success: true, message: "API key removed." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 3. Basic format validation
    if (typeof api_key !== "string" || !api_key.startsWith("sk-ant-")) {
      return new Response(
        JSON.stringify({ error: "Invalid API key format. Anthropic keys start with 'sk-ant-'." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 4. Encrypt and store
    const encryptionSecret = Deno.env.get("ENCRYPTION_SECRET");
    if (!encryptionSecret) {
      console.error("ENCRYPTION_SECRET env var is not set");
      return new Response(
        JSON.stringify({ error: "Server configuration error." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const encrypted = await encrypt(api_key, encryptionSecret);

    const serviceClient = createServiceClient();
    const { error } = await serviceClient
      .from("profiles")
      .update({ api_key_encrypted: encrypted })
      .eq("id", user.id);

    if (error) {
      console.error("Failed to store API key:", error);
      return new Response(
        JSON.stringify({ error: "Failed to store API key." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Return last 4 chars for display
    const last4 = api_key.slice(-4);
    return new Response(
      JSON.stringify({ success: true, key_hint: `sk-ant-•••••••••••${last4}` }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
