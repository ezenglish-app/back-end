#!/bin/bash

# OpenAI API URL
API_URL="https://api.openai.com/v1/audio/speech"
# Your OpenAI API key
API_KEY="sk-hVfdb7tX0wd4SFXFzFA_j5BO8lVSncVCP0dcdEpoiJT3BlbkFJ-MW_SywmMZpHMB6YjxiMFg1A6anBgzTT1P6Z6K5Z4A"
# Input JSON file
INPUT_FILE="./data/Verbs.json"

# Read words and UUIDs from JSON file into arrays
jq -c '.[]' "$INPUT_FILE" | while read -r item; do
  # Extract word and UUID
  word=$(echo "$item" | jq -r '.english')
  uuid=$(echo "$item" | jq -r '.uuid')

  # Make the API request using curl
  curl -s "$API_URL" \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d "{
      \"model\": \"tts-1-hd\",
      \"input\": \"$word\",
      \"voice\": \"echo\"
    }" \
    --output "./static/audios/${uuid}.mp3"

  echo "Generated ${uuid}.mp3 for word: $word"
done
