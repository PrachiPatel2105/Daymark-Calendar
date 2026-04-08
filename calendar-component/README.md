# Daymark Calendar

A beautiful, fully-featured React/Next.js calendar component inspired by physical wall calendars. Features date range selection, integrated notes, and a responsive design that works seamlessly on desktop and mobile devices.

## 🎨 Features

### Core Features
- **Wall Calendar Aesthetic**: Clean, modern design with monthly hero images that create a visual anchor
- **Date Range Selection**: Click to select start and end dates with clear visual feedback
- **Integrated Notes System**: Add notes linked to specific date ranges or general monthly notes
- **Fully Responsive**: Adapts beautifully from mobile to desktop with optimized layouts
- **Persistent Storage**: Notes are saved to localStorage and persist across sessions

### Enhanced Features
- **Smooth Animations**: Page-flip animation when changing months
- **Month-Specific Imagery**: Each month features a curated seasonal image
- **Today Indicator**: Current date is highlighted with a subtle indicator
- **Dark Mode Support**: Automatically adapts to system color scheme preferences
- **Touch-Friendly**: Optimized for touch interactions on mobile devices
- **Keyboard Accessible**: Full keyboard navigation support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd calendar-component
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 🏗️ Architecture & Design Decisions

### Technology Stack
- **Next.js 15**: React framework with App Router for optimal performance
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS for rapid, consistent styling
- **Lucide React**: Beautiful, consistent icon set

### Component Structure

```
components/
├── WallCalendar.tsx      # Main container component with state management
├── CalendarHeader.tsx    # Month navigation controls
├── CalendarGrid.tsx      # Interactive calendar grid with date selection
└── NotesSection.tsx      # Notes input and display
```

### Key Design Decisions

1. **Client-Side State Management**: Used React hooks for simplicity since this is a frontend-only component. For larger apps, consider Zustand or Redux.

2. **localStorage for Persistence**: Meets the requirement of no backend while providing a good user experience. Data persists across sessions.

3. **Date Range Selection Logic**: 
   - First click sets start date
   - Second click sets end date (automatically orders them)
   - Third click starts a new selection
   - Visual feedback at every step

4. **Responsive Strategy**:
   - Desktop: Side-by-side layout (image | calendar + notes)
   - Mobile: Stacked layout with collapsible notes section
   - Breakpoint at 1024px (lg in Tailwind)

5. **Accessibility**:
   - Semantic HTML elements
   - ARIA labels on interactive elements
   - Keyboard navigation support
   - Sufficient color contrast ratios

## 📱 Responsive Design

### Desktop (1024px+)
- Three-column grid layout
- Hero image on the left (1/3 width)
- Calendar and notes on the right (2/3 width)
- All features visible simultaneously

### Tablet (768px - 1023px)
- Stacked vertical layout
- Full-width hero image (reduced height)
- Full-width calendar grid
- Expandable notes section

### Mobile (<768px)
- Optimized touch targets (minimum 44x44px)
- Collapsible notes section to save space
- Larger text for readability
- Simplified navigation

## 🎯 Usage Examples

### Selecting a Date Range
1. Click on any date to set the start date
2. Click another date to complete the range
3. The range is highlighted in blue
4. Selected dates show a ring indicator

### Adding Notes
1. Select a date range (optional)
2. Type your note in the input field
3. Click "Add" or press Enter
4. Note appears in the list below with date association

### Navigating Months
- Use arrow buttons to move between months
- Smooth flip animation provides visual feedback
- Hero image changes to match the season

## 🎨 Customization

### Changing Month Images
Edit the `MONTH_IMAGES` array in `WallCalendar.tsx`:

```typescript
const MONTH_IMAGES = [
  "your-january-image-url",
  "your-february-image-url",
  // ... etc
];
```

### Styling
All styles use Tailwind CSS classes. Key customization points:
- Colors: Modify Tailwind config or use different color classes
- Spacing: Adjust padding/margin classes
- Animations: Modify transition classes

### Dark Mode
The component automatically respects system preferences. To force a mode:
- Add `dark` class to `<html>` element for dark mode
- Remove it for light mode

## 🧪 Testing Recommendations

While tests aren't included (per requirements), here's what you should test:

1. **Date Selection**:
   - Single date selection
   - Range selection (forward and backward)
   - Cross-month ranges
   - Edge cases (first/last day of month)

2. **Notes**:
   - Adding notes with and without date ranges
   - Deleting notes
   - localStorage persistence
   - Long note text handling

3. **Responsive Behavior**:
   - Layout changes at breakpoints
   - Touch interactions on mobile
   - Collapsible sections

4. **Accessibility**:
   - Keyboard navigation
   - Screen reader compatibility
   - Focus management

## 📦 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Netlify
1. Build command: `npm run build`
2. Publish directory: `.next`
3. Deploy

### Other Platforms
The app is a standard Next.js application and can be deployed to any platform supporting Node.js.

## 🔮 Future Enhancements

Potential features to add:
- Event/reminder system with notifications
- Export notes to PDF or calendar formats
- Multiple calendar views (week, year)
- Recurring events
- Color-coded categories for notes
- Drag-and-drop date selection
- Integration with external calendar APIs
- Collaborative features (with backend)
- Custom themes and color schemes
- Holiday markers and special dates

## 📄 License

MIT License - feel free to use this component in your projects!

## 🙏 Acknowledgments

- Images from Unsplash
- Icons from Lucide React
- Inspired by traditional wall calendars
