# Design System Architecture

```mermaid
graph TD
    A[ITCSS Layers] --> B[Settings - Design Tokens]
    A --> C[Tools - Mixins/Functions]
    A --> D[Generic - Reset/Normalize]
    A --> E[Elements - HTML defaults]
    A --> F[Objects - Layout patterns]
    A --> G[Components - UI pieces]
    A --> H[Utilities - Helpers]

    I[Atomic Design] --> J[Atoms]
    I --> K[Molecules]
    I --> L[Organisms]
    I --> M[Templates]
    I --> N[Pages]

    G -.-> J
    G -.-> K
    G -.-> L
```

> Диаграмма показывает связь слоёв ITCSS и уровней Atomic Design, применяемых в проекте. 