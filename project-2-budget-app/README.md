# Budget Generator

A web application built with React and TypeScript that allows users to create customized digital service quotations quickly and intuitively.

Users can select different services, configure website development options, enter their contact information, and receive an automatically calculated budget. The application also allows users to browse and manage previously generated quotations.

## Live Demo

https://project-2-budget.vercel.app/

## Repository

https://github.com/bertagonzalezgu/PROJECT-2---BUDGET

---

## Project Description

Budget Generator was developed to streamline the quotation process for digital services, reducing the time spent on preliminary estimates and helping potential clients understand pricing more efficiently.

The platform provides an interactive and user-friendly experience for calculating quotations for:

- SEO Services
- Digital Advertising
- Custom Website Development

The system automatically calculates the total price based on the selected services and configuration options.

---

### Budget Management

- Create personalized quotations.
- Generate unique identifiers for each budget.
- View detailed budget information.
- Store generated budgets.
- Search and filter existing quotations.

### User Experience

- Mobile-first responsive design.
- Intuitive navigation flow.
- Reusable and scalable components.
- Accessibility-focused implementation following WCAG guidelines.

---

## Technologies

### Frontend

- React
- TypeScript
- Vite

### Routing

- React Router DOM

### Testing

- Vitest
- React Testing Library

### Code Quality

- ESLint

### Data Persistence

- Local Storage

### Deployment

- Vercel

---

## Project Structure

```text
src/
│
├── assets/
│   ├── icons/
│   └── img/
│
├── components/
│   ├── BudgetCard.tsx
│   ├── BudgetDetail.tsx
│   ├── BudgetList.tsx
│   ├── ClientForm.tsx
│   ├── ModalCard.tsx
│   ├── PriceCounter.tsx
│   ├── ServiceCard.tsx
│   └── WebConfigurator.tsx
│
├── data/
│   ├── modal.json
│   └── services.json
│
├── hooks/
│   ├── useBudgetCalculator.ts
│   ├── useBudgetList.ts
│   └── useSearchFilter.ts
│
├── pages/
│   ├── App.tsx
│   └── BudgetDetailPage.tsx
│
├── services/
│   ├── idGenerator.ts
│   └── priceCalculator.ts
│
├── tests/
│   └── setupTests.ts
│
├── types/
│   ├── budget.types.ts
│   ├── form.types.ts
│   ├── modal.types.ts
│   └── service.types.ts
│
├── utils/
│   └── formatDate.ts
│
├── main.tsx
└── index.css
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/bertagonzalezgu/PROJECT-2---BUDGET.git
```

Navigate to the project folder:

```bash
cd PROJECT-2---BUDGET/project-2-budget-app
```

Install dependencies:

```bash
npm install
```

---

## Running the Application

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to:

```text
http://localhost:5173
```

---

## Testing

Run the test suite:

```bash
npm run test
```

Generate a coverage report:

```bash
npm run coverage
```

---

## Architecture

The application follows a modular architecture based on:

- Reusable UI components
- Custom React Hooks for business logic
- Independent services for calculations and ID generation
- Strong typing with TypeScript
- Configurable data stored in JSON files

This structure improves scalability, maintainability, and code readability.

---

## Accessibility

The project was developed following accessibility best practices:

- Semantic HTML structure
- Clear navigation patterns
- Responsive layouts
- Accessible form controls
- Proper visual hierarchy
- WCAG-oriented design principles

---

## Deployment

The application is deployed on Vercel:

https://project-2-budget.vercel.app/

---

## Author

Developed by **Berta González** as part of the **Frontend Bootcamp at IT Academy (Barcelona Activa)**.

This project focuses on applying:

- React
- TypeScript
- Testing methodologies
- Component-based architecture
- Frontend best practices
- Responsive and accessible design