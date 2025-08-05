# Property Listing Chatbot

This sample application demonstrates how to combine Amazon Nova core models with
Nova Sonic to build a multimodal property listing assistant. The chatbot accepts
both typed and spoken questions, retrieves relevant property listings, and
responds with text and optional speech.

## Architecture

1. **Central Orchestrator** – `PropertyChatbot` routes text or audio input,
   maintains a session ID, and coordinates other components.
2. **Retrieval Layer** – `PropertyRetriever` loads a small JSON file of sample
   property listings and performs naive keyword search.
3. **Core Nova Model** – `LLMClient` calls a text-based Nova model (default:
   `amazon.nova-lite-v1:0`) to reason over retrieved listings and craft answers.
4. **Nova Sonic** – `SonicClient` optionally converts speech to text and text to
   speech so the assistant can handle voice interactions.

## Usage

Install dependencies and configure AWS credentials for Bedrock.

```bash
python -m pip install -r requirements.txt
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...
export AWS_DEFAULT_REGION=us-east-1
```

### Text query

```bash
python property_chatbot.py --text "3 bedroom house in Seattle"
```

### Voice query

Provide a WAV file containing the user's spoken question.

```bash
python property_chatbot.py --audio question.wav
```

The script will print the transcript and text answer. A PCM file named
`response_audio.pcm` is written containing the synthesized speech from the
assistant.

## Notes

This example focuses on illustrating how components fit together. Production
applications should implement robust error handling, streaming audio for low
latency, and secure storage of user data.
