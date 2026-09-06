import { corsHeaders } from "../_shared/cors.ts";
import { createUserClient, createServiceClient } from "../_shared/supabase.ts";
import { decrypt } from "../_shared/crypto.ts";

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
        JSON.stringify({ valid: false, error: "Missing Authorization header." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const userClient = createUserClient(authHeader);
    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ valid: false, error: "Invalid or expired token." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 2. Get encrypted key
    const serviceClient = createServiceClient();
    const { data: profile, error: profileError } = await serviceClient
      .from("profiles")
      .select("api_key_encrypted")
      .eq("id", user.id)
      .single();

    if (profileError || !profile?.api_key_encrypted) {
      return new Response(
        JSON.stringify({ valid: false, error: "No API key stored." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 3. Decrypt
    const encryptionSecret = Deno.env.get("ENCRYPTION_SECRET");
    if (!encryptionSecret) {
      return new Response(
        JSON.stringify({ valid: false, error: "Server configuration error." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    let apiKey: string;
    try {
      apiKey = await decrypt(profile.api_key_encrypted, encryptionSecret);
    } catch {
      return new Response(
        JSON.stringify({ valid: false, error: "Could not decrypt key. Try re-saving it." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 4. Make a minimal test call to Anthropic
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 10,
          messages: [{ role: "user", content: "Say OK" }],
        }),
      });

      if (response.ok) {
        const last4 = apiKey.slice(-4);
        return new Response(
          JSON.stringify({ valid: true, key_hint: `sk-ant-•••••••••••${last4}` }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      if (response.status === 401) {
        return new Response(
          JSON.stringify({ valid: false, error: "API key is invalid." }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      if (response.status === 429) {
        // Rate limited but key works
        const last4 = apiKey.slice(-4);
        return new Response(
          JSON.stringify({ valid: true, key_hint: `sk-ant-•••••••••••${last4}`, note: "Key is valid but currently rate-limited." }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      return new Response(
        JSON.stringify({ valid: false, error: `Anthropic returned status ${response.status}.` }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    } catch {
      return new Response(
        JSON.stringify({ valid: false, error: "Could not reach Anthropic API." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ valid: false, error: "An unexpected error occurred." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
