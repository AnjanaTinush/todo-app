# Todo App - Professional Task Management Application

A full-stack todo application built with React, Express.js, and MySQL. Features dark/light theme support, emoji attributes, real-time updates, and comprehensive task management with Docker containerization.

## Overview

This is a modern, professional-grade Todo application that helps users manage their tasks efficiently. The app includes:

- ✨ **Task Management**: Create, read, update, and delete tasks with ease
- 😊 **Emoji Attributes**: Assign emojis to tasks for visual organization
- 🌙 **Dark/Light Theme**: Toggle between dark and light modes with persistent storage
- ✅ **Confirmation Dialogs**: Confirmations for delete and done actions
- 🔔 **Toast Notifications**: Real-time feedback for user actions
- 📱 **Responsive Design**: Works seamlessly on all device sizes
- 🐳 **Docker Ready**: Complete containerization with Docker Compose

## Project Structure

```
todo-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                  # MySQL connection pool
│   │   ├── models/
│   │   │   └── taskModel.js           # Data layer (CRUD operations)
│   │   ├── services/
│   │   │   └── taskService.js         # Business logic layer
│   │   ├── controllers/
│   │   │   └── taskController.js      # Request handling layer
│   │   ├── routes/
│   │   │   └── taskRoutes.js          # API route definitions
│   │   ├── app.js                     # Express app setup
│   │   └── server.js                  # Server initialization
│   ├── .dockerignore                  # Docker ignore patterns
│   ├── Dockerfile                     # Backend container configuration
│   ├── package.json                   # Node dependencies
│   └── .env                           # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskList.jsx           # Task list display component
│   │   │   ├── TaskItem.jsx           # Individual task component
│   │   │   ├── TaskForm.jsx           # Task creation form
│   │   │   ├── EditTaskModal.jsx      # Task editing modal
│   │   │   ├── EmojiSelector.jsx      # Emoji picker component
│   │   │   ├── EmojiGrid.jsx          # Emoji grid display
│   │   │   ├── Toast.jsx              # Toast notification component
│   │   │   ├── ConfirmDialog.jsx      # Confirmation dialog component
│   │   │   └── ThemeToggle.jsx        # Dark/light theme toggle
│   │   ├── context/
│   │   │   └── ThemeContext.jsx       # Theme state management
│   │   ├── hooks/
│   │   │   └── useTasks.js            # Custom hooks for task management
│   │   ├── api/
│   │   │   └── taskService.js         # API calls to backend
│   │   ├── pages/
│   │   │   └── Home.jsx               # Main application page
│   │   ├── App.js                     # Root app component
│   │   ├── App.css                    # App styling
│   │   └── index.js                   # React entry point
│   ├── .dockerignore                  # Docker ignore patterns
│   ├── Dockerfile                     # Frontend container configuration
│   ├── tailwind.config.js             # Tailwind CSS configuration
│   ├── postcss.config.js              # PostCSS configuration
│   ├── package.json                   # Node dependencies
│   └── public/                        # Static assets
│
├── docker-compose.yml                 # Multi-container orchestration
├── .env                               # Root environment variables
├── .gitignore                         # Git ignore patterns
└── README.md                          # This file
```

## Features

### Task Management
- **Create Tasks**: Add new tasks with title, description, and emoji
- **Edit Tasks**: Update existing task information
- **Delete Tasks**: Remove tasks with confirmation
- **Mark as Done**: Complete tasks with one click
- **Recent Tasks**: Display only the 5 most recent incomplete tasks

### User Interface
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Theme**: Professional theme switching with localStorage persistence
- **Emoji Selector**: 40+ emoji options for task organization
- **Toast Notifications**: Auto-dismissing success/error messages at top-center
- **Confirmation Dialogs**: Modal confirmations for destructive actions

### Technical Architecture
- **SOLID Principles**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **Component-based**: Reusable, well-organized React components
- **Context API**: Centralized state management for theme
- **Tailwind CSS**: Utility-first styling with no global CSS
- **Express.js**: Minimal, flexible REST API
- **MySQL**: Persistent data storage with proper schema

## Technology Stack

### Frontend
- **React 19**: UI library
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API calls
- **Context API**: State management

### Backend
- **Node.js 18**: JavaScript runtime
- **Express.js**: Web framework
- **MySQL 8.0**: Relational database
- **mysql2/promise**: Database driver

### DevOps
- **Docker**: Container platform
- **Docker Compose**: Multi-container orchestration
- **phpMyAdmin**: Database management interface

## Installation & Setup

### Prerequisites
- Docker Desktop (includes Docker and Docker Compose)
- Git
- Node.js 18+ (for local development)
- npm or yarn

### Option 1: Using Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   ```

2. **Create environment file** (if not already present)
   ```bash
   # Root .env file
   cat > .env << EOF
   DB_HOST=mysql
   DB_USER=todo_user
   DB_PASSWORD=todo_password
   DB_NAME=todo_db
   PORT=4000
   REACT_APP_API_BASE_URL=http://localhost:4000/api
   EOF
   ```

3. **Start all services**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000/api
   - phpMyAdmin: http://localhost:8080
   - MySQL: localhost:3306

### Option 2: Local Development

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env  # Configure your environment variables
npm start           # For development: npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

The frontend will automatically proxy API requests to the backend during development.

## API Endpoints

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all recent tasks (max 5) |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| PUT | `/api/tasks/:id/done` | Mark task as done |
| DELETE | `/api/tasks/:id` | Delete a task |

### Request/Response Examples

#### Create Task
```bash
POST /api/tasks
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the todo app",
  "emoji": "🚀"
}

Response: 201 Created
{
  "id": 1,
  "title": "Complete project",
  "description": "Finish the todo app",
  "emoji": "🚀",
  "completed": false
}
```

#### Get Tasks
```bash
GET /api/tasks

Response: 200 OK
[
  {
    "id": 1,
    "title": "Complete project",
    "description": "Finish the todo app",
    "emoji": "🚀",
    "completed": false,
    "created_at": "2025-10-28T18:00:00.000Z"
  }
]
```

## Environment Variables

### .env (Root)
```bash
# Database Configuration
DB_HOST=mysql                           # MySQL host (use 'mysql' for Docker)
DB_USER=todo_user                       # Database user
DB_PASSWORD=todo_password               # Database password
DB_NAME=todo_db                         # Database name

# Backend Configuration
PORT=4000                               # Backend server port

# Frontend Configuration
REACT_APP_API_BASE_URL=http://localhost:4000/api  # Backend API URL
```

## Database Schema

### task Table
```sql
CREATE TABLE task (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  emoji VARCHAR(10),
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Docker Commands

### Start Services
```bash
# Start all services in background
docker-compose up -d

# Start with rebuild
docker-compose up -d --build

# Start specific service
docker-compose up -d frontend
```

### View Logs
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql

# View real-time logs
docker-compose logs -f backend
```

### Stop Services
```bash
# Stop all services
docker-compose down

# Stop and remove volumes (removes database data)
docker-compose down -v
```

### Container Status
```bash
# Check running containers
docker-compose ps

# Get container details
docker inspect todo_backend
```

## Development

### Adding a New Feature

1. **Plan the feature** using SOLID principles
2. **Create components** in the appropriate directory
3. **Add tests** if necessary
4. **Update this README** with new information

### Code Style

- **Frontend**: React functional components with hooks
- **Backend**: Modular structure with separation of concerns
- **CSS**: Tailwind CSS utilities only (no global CSS)
- **Logging**: Console logs without emojis

### Useful Commands

#### Frontend
```bash
cd frontend

# Development
npm start                 # Start dev server with hot reload
npm run build            # Build for production
npm test                 # Run tests
npm run eject            # Eject from create-react-app (irreversible)
```

#### Backend
```bash
cd backend

# Development
npm start                # Run with node
npm run dev              # Run with nodemon (auto-reload)
npm test                 # Run tests
```

## Troubleshooting

### Database Connection Error
**Problem**: `Error: connect ECONNREFUSED 172.18.0.2:3306`

**Solution**:
- Ensure MySQL container is running: `docker-compose ps`
- Wait 10-15 seconds for MySQL to initialize
- Check MySQL logs: `docker-compose logs mysql`

### Frontend Shows "Cannot GET /" Error
**Problem**: Frontend container shows error page

**Solution**:
- Ensure frontend build completed: `docker-compose logs frontend`
- Rebuild: `docker-compose up -d --build frontend`
- Clear browser cache and refresh

### API Calls Returning 404
**Problem**: POST/PUT/DELETE requests return 404

**Solution**:
- Verify backend is running: `docker-compose ps`
- Check API URL in frontend: Should be `http://localhost:4000/api`
- View backend logs: `docker-compose logs backend`

### Data Not Persisting
**Problem**: Tasks are created but not saved

**Solution**:
- Verify MySQL data volume: `docker volume ls`
- Check database connection: `docker-compose logs backend`
- Ensure `.env` has correct DB credentials
- Rebuild containers: `docker-compose down -v && docker-compose up -d --build`

### phpMyAdmin Cannot Connect
**Problem**: phpMyAdmin shows connection error

**Solution**:
- Wait for MySQL to fully initialize (30-45 seconds)
- Use credentials from `.env` file
- Ensure MySQL container is running: `docker-compose ps`
- Try refreshing the page

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Frontend build size: ~150KB (gzipped)
- Backend startup time: < 5 seconds
- Database query time: < 100ms (typical)
- Frontend load time: < 2 seconds

## Security Considerations

- **Environment Variables**: Never commit `.env` files
- **Database Credentials**: Use strong passwords in production
- **CORS**: Currently allows all origins (configure in production)
- **Input Validation**: Implemented on both frontend and backend
- **SQL Injection**: Protected using parameterized queries

## Deployment

### Production Deployment

1. **Update environment variables**
   ```bash
   DB_HOST=your-db-host.com
   DB_USER=production_user
   DB_PASSWORD=strong_password
   REACT_APP_API_BASE_URL=https://api.yourdomain.com
   ```

2. **Build and push Docker images**
   ```bash
   docker build -t your-registry/todo-backend:1.0 ./backend
   docker build -t your-registry/todo-frontend:1.0 ./frontend
   docker push your-registry/todo-backend:1.0
   docker push your-registry/todo-frontend:1.0
   ```

3. **Deploy using Docker Compose or Kubernetes**
   - Update docker-compose.yml with production images
   - Set up SSL/TLS certificates
   - Configure reverse proxy (nginx/traefik)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Project Information

- **Created**: October 2025
- **Last Updated**: October 28, 2025
- **Version**: 1.0.0
- **Node Version**: 18 LTS
- **React Version**: 19
- **MySQL Version**: 8.0

## Support & Contact

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review troubleshooting section

## Acknowledgments

- React documentation and community
- Tailwind CSS for styling utilities
- Express.js framework
- MySQL database
- Docker for containerization

## Changelog

### Version 1.0.0 (October 28, 2025)
- Initial release
- Task CRUD operations
- Dark/Light theme support
- Emoji attributes
- Toast notifications
- Confirmation dialogs
- Docker containerization
- phpMyAdmin integration
- Responsive design
- SOLID principles implementation

---

**Happy Task Managing!**
