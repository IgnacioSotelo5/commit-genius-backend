# 🚀 Commit Genius API

REST API that analyzes git diffs and generates conventional commit messages using AI.

## ✨ Features

- **AI-Powered Analysis**: Uses Groq API to understand code changes
- **Conventional Commits**: Generates standardized commit messages (feat, fix, chore, docs, etc.)
- **Type Safety**: Built with TypeScript and Elysia's schema validation
- **High Performance**: Powered by Bun and Elysia for optimal speed
- **CORS Enabled**: Ready for cross-origin requests from frontend
- **Request Validation**: Automatic input validation and error handling

## 🛠️ Tech Stack

- **[Elysia](https://elysiajs.com/)** - High-performance TypeScript web framework
- **[Bun](https://bun.sh/)** - Fast JavaScript runtime and package manager
- **[Groq SDK](https://groq.com/)** - AI integration for intelligent commit generation
- **TypeScript** - Type-safe development experience

## 🚀 Getting Started

### Prerequisites
- Bun installed (`curl -fsSL https://bun.sh/install | bash`)
- Groq API key ([Get one here](https://console.groq.com/))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/commit-genius-api.git
cd commit-genius-api
```

2. Install dependencies:
```bash
bun install
```

3. Create `.env` file:
```bash
GROQ_API_KEY=your_groq_api_key_here
```

4. Start the development server:
```bash
bun dev
```

The API will be running on `http://localhost:3000`

## 📡 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### `GET /`
Health check endpoint.

**Response:**
```
"Hello Elysia"
```

#### `POST /generate-commit`
Analyzes a git diff and returns 3 conventional commit suggestions.

**Request Body:**
```json
{
  "diff": "diff --git a/src/components/UserProfile.tsx b/src/components/UserProfile.tsx\nindex 1a2b3c4..5d6e7f8 100644\n--- a/src/components/UserProfile.tsx\n+++ b/src/components/UserProfile.tsx\n@@ -1,4 +1,5 @@\n import React from 'react';\n+import { User } from '../types/User';\n..."
}
```

**Success Response (200):**
```json
{
  "commits": [
    {
      "title": "feat: add edit button to UserProfile component",
      "description": "Introduce an 'Edit Profile' button inside the profile information section with a click handler that logs a message. This provides a UI hook for future edit functionality."
    },
    {
      "title": "style: rename container class and add semantic class names",
      "description": "Update the root div class from `.profile` to `.profile-container`. Wrap the name and email in a `.profile-info` div and add `.profile-name` and `.profile-email` classes to the respective elements for better styling hooks."
    },
    {
      "title": "chore: import User type for future use",
      "description": "Add an import statement for the `User` type from the project's type definitions. This prepares the component for enhanced type safety, although the type is not yet utilized."
    }
  ]
}
```

**Error Response (400):**
```json
{
  "error": "Invalid request body"
}
```

## 🎯 How It Works

1. **Receives git diff** through POST request
2. **Analyzes changes** using Groq's AI model (`openai/gpt-oss-120b`)
3. **Generates 3 commit options** following conventional commit standards
4. **Returns structured JSON** with title and description for each commit

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GROQ_API_KEY` | Your Groq API key for AI processing | ✅ Yes | - |
| `PORT` | Server port | ❌ No | 3000 |

### AI Model Configuration

Currently using `openai/gpt-oss-120b` model for optimal performance and accuracy in code analysis.

## 📝 Request/Response Examples

### Analyzing a simple component change:

**Request:**
```bash
curl -X POST http://localhost:3000/generate-commit \
  -H "Content-Type: application/json" \
  -d '{
    "diff": "diff --git a/src/components/Button.tsx b/src/components/Button.tsx\n--- a/src/components/Button.tsx\n+++ b/src/components/Button.tsx\n@@ -5,6 +5,7 @@ interface ButtonProps {\n   onClick?: () => void;\n   children: React.ReactNode;\n   variant?: \"primary\" | \"secondary\";\n+  disabled?: boolean;\n }\n\n const Button: React.FC<ButtonProps> = ({"
  }'
```

**Response:**
```json
{
  "commits": [
    {
      "title": "feat: add disabled prop to Button component",
      "description": "Add optional disabled property to Button interface to support disabled state functionality."
    },
    {
      "title": "enhance: extend Button component with disabled support", 
      "description": "Introduce disabled prop to ButtonProps interface for better component flexibility and accessibility."
    },
    {
      "title": "update: add disabled option to Button props",
      "description": "Extend Button component interface to include disabled boolean prop for enhanced user interaction control."
    }
  ]
}
```

## 🚀 Deployment

### Railway (Recommended)
1. Connect your GitHub repository to Railway
2. Add `GROQ_API_KEY` environment variable
3. Deploy automatically

### Manual Deployment
1. Build the project: `bun run build` (if you add build script)
2. Start production server: `bun start`

## 🧪 Development

### Scripts
```bash
# Start development server with hot reload
bun dev

# Run the server
bun run index.ts

# Install dependencies
bun install
```

### Project Structure
```
├── index.ts          # Main server file with Elysia setup
├── package.json      # Dependencies and scripts
├── .env.example      # Environment variables template
└── README.md         # This file
```

## 🔒 Security Considerations

- API key is stored in environment variables
- CORS is configured for cross-origin requests
- Input validation through Elysia schemas
- Error messages don't expose sensitive information

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with proper TypeScript types
4. Test your changes locally
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Related Projects

- [Commit Genius Frontend](https://github.com/IgnacioSotelo5/commit-genius-frontend) - React frontend for this API

---

Built with ⚡ **Bun** + **Elysia** for maximum performance

**Live API**: [https://commit-genius-api.railway.app](https://commit-genius-api.railway.app)
