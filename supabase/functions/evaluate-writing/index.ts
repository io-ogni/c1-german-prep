import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt_type, topic, context, user_text, prompt_id, target_word_count } = await req.json();

    if (!user_text || !prompt_id) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI service not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemPrompt = `You are a German language writing evaluator for the telc C1 Hochschule exam. 
Evaluate the student's text using these 4 criteria (each scored A/B/C/D with points out of 12):
- Aufgabengerechtheit (Task Fulfillment): A=12, B=8, C=4, D=0
- Korrektheit (Correctness): A=12, B=8, C=4, D=0  
- Repertoire (Range): A=12, B=8, C=4, D=0
- Kommunikative Gestaltung (Communicative Design): A=12, B=8, C=4, D=0

The text type is: ${prompt_type}
The topic is: ${topic}
Context given to student: ${context}
Target word count: ~${target_word_count}

Respond ONLY with valid JSON in this exact format:
{
  "score_aufgabengerechtheit": "B (8/12)",
  "score_korrektheit": "B (8/12)",
  "score_repertoire": "C (4/12)",
  "score_kommunikative_gestaltung": "B (8/12)",
  "total_points": 28,
  "llm_feedback_de": "Detailed feedback in German about each criterion...",
  "llm_feedback_en": "Detailed feedback in English about each criterion...",
  "llm_corrections": [
    {
      "original": "incorrect phrase",
      "corrected": "correct phrase",
      "category": "morphologie",
      "explanation_de": "German explanation",
      "explanation_en": "English explanation"
    }
  ],
  "improved_version": "Full rewritten text at C1 level"
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Evaluate this text:\n\n${user_text}` },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI Gateway error:", errText);
      return new Response(JSON.stringify({ error: "AI evaluation failed" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiResult = await response.json();
    const content = aiResult.choices?.[0]?.message?.content ?? "";

    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Could not parse AI response:", content);
      return new Response(JSON.stringify({ error: "Could not parse evaluation" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const evaluation = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify(evaluation), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
