## Overview

This project implements an interactive, canvas-based UI using ReactFlow, with a
focus on predictable state management and clear UI behavior.

## Architecture

- ReactFlow is used as the rendering and interaction layer for nodes and edges.
- Zustand acts as the single source of truth for canvas UI state.
- TanStack Query is used to handle async data loading and keep server state
  separate from UI state.

## State Management

The canvas is implemented as a controlled component. All interactions
(dragging nodes, connecting edges) emit change events from ReactFlow, which are
explicitly applied to centralized state in Zustand. This ensures predictable and
easy-to-debug UI behavior.

## UI Decisions

A minimal toolbar is provided to trigger canvas actions such as node creation
and clearing the canvas. The UI is intentionally kept simple to emphasize
correctness and interaction reliability over visual complexity.

## Bonus Implementations

- **Node Creation via Toolbar**: Instead of a single generic node, semantic
  creation actions are exposed for different node types.
- **Node Types (Service & Database)**: Custom node types are implemented using
  ReactFlow’s `nodeTypes` API. Each node type has distinct styling and semantics,
  demonstrating data-driven rendering without conditional logic inside the
  canvas.
- **Clear Canvas Action**: A utility action is provided to reset the canvas
  state, demonstrating predictable global state updates.

## Trade-offs

The focus was placed on clean architecture, predictable behavior, and clear
state ownership rather than advanced styling, animations, or keyboard shortcuts.

## Future Improvements

- Inspector panel for editing node data
- Undo/redo support for canvas actions
- Keyboard shortcuts (fit view, panel toggles)
- Performance optimizations for large graphs
