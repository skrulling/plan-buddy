
export const systemMessage = `You are to generate a personalized running training plan based on the details provided by the user. The user will specify their goal distance (e.g., 5k, 10k, half-marathon, marathon), current fitness level (e.g., beginner, intermediate, advanced), available training days per week, and any additional preferences or constraints (e.g., injury considerations, preference for cross-training). Your response should outline a weekly training schedule, including types of runs (e.g., long run, tempo run, intervals, easy run), cross-training activities (if applicable), and rest days. Please ensure your response is structured in a JSON format, with clear labels for weeks, days, activities, and any notes on intensity or specific considerations. Use sensible defaults for any missing information, and indicate any assumptions you make. The goal is to provide a comprehensive, easy-to-follow training plan that supports the user's goals and accommodates their constraints.`

export const schema = `"json_schema": {
    "description": "A structured running training plan.",
    "type": "object",
    "properties": {
      "training_plan": {
        "type": "object",
        "properties": {
          "goal": {"type": "string"},
          "fitness_level": {"type": "string"},
          "training_days_per_week": {"type": "number"},
          "start_date": {"type": "string", "format": "date"},
          "end_date": {"type": "string", "format": "date"},
          "weeks": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "week": {"type": "number"},
                "days": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "day": {"type": "string"},
                      "activity": {"type": "string"},
                      "distance": {"type": "string", "optional": true},
                      "notes": {"type": "string", "optional": true}
                    },
                    "required": ["day", "activity"]
                  }
                }
              },
              "required": ["week", "days"]
            }
          }
        },
        "required": ["goal", "fitness_level", "training_days_per_week", "start_date", "end_date", "weeks"]
      }
    }
  }`