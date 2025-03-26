# Agent Guidelines for Costa Rica Pickleball Website Project

## Introduction

This document provides comprehensive instructions for AI agents working on the Costa Rica Pickleball Website Project. It outlines collaboration procedures, context management, documentation standards, and best practices to ensure consistent and effective development.

## 1. Agent Identification and Tracking

### 1.1 Agent Numbering and Naming

When you begin working on this project, identify yourself as follows:

```
Agent-[NUMBER]: [NAME]

Example: Agent-1: Atlas
```

- **NUMBER**: Sequential number based on previous agents (check the project memory to determine the next available number)
- **NAME**: Choose a unique name for yourself to make communication more personalized

### 1.2 Work Attribution

When updating documentation:
- Clearly mark your contributions with your agent identifier
- For significant code or implementation, include an attribution comment:
  ```javascript
  // Implemented by Agent-2: Luna on 2023-06-15
  ```

### 1.3 Handoff Protocol

When your session concludes (either by completion or time constraints):
1. Document your progress in project memory
2. Update the todo list with completed and in-progress tasks
3. Update the next agent prompt with detailed context on where you left off
4. If a task is partially complete, clearly document the current state and next steps

## 2. Documentation Management

### 2.1 Documentation Hierarchy

Our documentation follows this hierarchy:
1. **00-agent-guidelines.md** (this document) - Static collaboration rules
2. **01-next-agent-prompt.md** - Dynamic instructions for the next agent
3. **project-overview.md** - High-level project description
4. **style-guide.md** - Design system and styling guidelines
5. **data-models.md** - Data structures and validation
6. **implementation-guide.md** - Step-by-step implementation
7. **maintenance-guide.md** - Ongoing maintenance procedures
8. **06-project-memory.md** - Record of completed work
9. **07-todo-list.md** - Task tracking

### 2.2 Documentation Update Rules

- **Never modify 00-agent-guidelines.md** unless explicitly instructed
- **Always update 01-next-agent-prompt.md** before concluding your session
- **Update 06-project-memory.md** when you complete tasks or make significant progress
- **Update 07-todo-list.md** as tasks progress through different states

### 2.3 Documentation Format Standards

- Use Markdown formatting consistently
- Structure documents with clear hierarchical headings
- Use code blocks with language specification for code samples
- Include diagrams when helpful (using Mermaid syntax)
- Date all updates in ISO format (YYYY-MM-DD)

## 3. Task Management Process

### 3.1 Task States

Tasks in the todo list follow this lifecycle:
1. **Not Started** - Defined but not yet begun
2. **In Progress** - Currently being worked on
3. **Blocked** - Cannot proceed due to dependencies or issues
4. **Completed** - Successfully implemented and documented

### 3.2 Task Entry Format

Each task in the todo list should follow this format:

```markdown
### [Task Title]
- **Status**: [Not Started|In Progress|Blocked|Completed]
- **Assigned**: [Agent identifier or "Unassigned"]
- **Priority**: [High|Medium|Low]
- **Dependencies**: [List of dependent tasks if any]
- **Description**: [Detailed task description]
- **Acceptance Criteria**: [Clear criteria for completion]
- **Notes**: [Additional context or implementation details]
- **Completed By**: [Agent identifier] on [YYYY-MM-DD] *(only when completed)*
```

### 3.3 Task Selection Rules

When selecting your next task:
1. First, complete any task you previously started
2. If none, select the highest priority unassigned task with no unresolved dependencies
3. Update the task entry with your agent identifier
4. Move the task to "In Progress" status

## 4. Implementation Guidelines

### 4.1 Code Quality Standards

- Write clean, well-commented code
- Follow standard JavaScript/React best practices
- Include JSDoc comments for all functions, classes, and components
- Write unit tests for core functionality
- Handle errors gracefully with appropriate messaging

### 4.2 Development Workflow

1. **Plan** - Before coding, document your approach
2. **Implement** - Write minimal, focused code
3. **Test** - Verify functionality works as expected
4. **Document** - Update relevant documentation
5. **Review** - Self-review your implementation

### 4.3 Integration Guidelines

When integrating with existing systems:
- Minimize changes to the existing codebase
- Prefer on-the-fly computation over data model changes
- Ensure backward compatibility
- Document any integration points clearly

## 5. Context Retention

### 5.1 Project Memory Structure

The project memory document contains:
1. **Project Overview** - Brief description of the project
2. **Current Status** - Overall project status
3. **Component Status** - Status of individual components
4. **Implementation Decisions** - Record of key decisions
5. **Known Issues** - Documented problems and workarounds
6. **Agent Contributions** - Record of work by each agent

### 5.2 Memory Update Rules

When updating the project memory:
1. Add significant implementation details
2. Document any design decisions with rationales
3. Update component status percentages
4. Note any issues encountered and how they were resolved
5. Record your contributions under the Agent Contributions section

## 6. Communication Guidelines

### 6.1 Reporting Progress

When reporting progress to the human:
- Be concise but comprehensive
- Highlight completed work
- Note any blockers or issues
- Suggest next steps clearly
- Avoid technical jargon unless necessary

### 6.2 Asking for Clarification

When you need clarification:
1. Clearly state what you don't understand
2. Provide context on why it's causing confusion
3. Offer potential interpretations if possible
4. Ask specific, direct questions

### 6.3 Making Recommendations

When making recommendations:
1. Present options with pros and cons
2. Make a clear recommendation
3. Explain your reasoning
4. Note any assumptions made

## 7. Problem Resolution

### 7.1 Issue Documentation Format

When documenting issues:

```markdown
### [Issue Title]
- **Identified By**: [Agent identifier]
- **Date**: [YYYY-MM-DD]
- **Status**: [Open|In Progress|Resolved]
- **Priority**: [High|Medium|Low]
- **Description**: [Detailed issue description]
- **Impact**: [Effect on project/functionality]
- **Root Cause**: [Analysis of cause]
- **Resolution**: [How it was or should be resolved]
- **Resolved By**: [Agent identifier] on [YYYY-MM-DD] *(only when resolved)*
```

### 7.2 Handling Blockers

When you encounter a blocker:
1. Document the issue following the format above
2. Move affected tasks to "Blocked" status
3. Clearly explain the dependency
4. If possible, suggest workarounds or alternatives
5. Highlight the blocker to the human if it requires external input

## 8. Conclusion

These guidelines ensure consistent, high-quality work on the Costa Rica Pickleball Website Project. By following these standards, you help maintain project continuity and make it easier for other agents to build upon your work.

If you have questions about these guidelines, ask for clarification before proceeding with implementation work.

---

Last updated: 2023-05-25 