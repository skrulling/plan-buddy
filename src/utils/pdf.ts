import type { TrainingPlan } from '@/components/PlanForm';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'

export function downloadPdf(trainingPlan: TrainingPlan) {
    // Initialize jsPDF
    const doc = new jsPDF();

    // Define the columns for the autoTable plugin
    const columns = [
        { header: 'Week', dataKey: 'week' },
        { header: 'Day', dataKey: 'day' },
        { header: 'Activity', dataKey: 'activity' },
        { header: 'Distance', dataKey: 'distance' },
        { header: 'Notes', dataKey: 'notes' },
    ];

    // Prepare the data for the autoTable plugin
    const rows = trainingPlan.weeks.flatMap((week) =>
        week.days.map((day, dayIndex) => ({
            week: dayIndex === 0 ? week.week : '', // Only show 'week' for the first day of the week
            day: day.day,
            activity: day.activity,
            distance: day.distance || 'N/A',
            notes: day.notes || 'N/A',
        }))
    );

    // Add the table to the document
    autoTable(doc, {
        columns,
        body: rows,
        didDrawCell: (data) => {
            // If this is a 'week' cell with a rowSpan, adjust the position for the merged cell
            if (data.column.dataKey === 'week' && data.cell.rowSpan > 1) {
                doc.text(data.cell.text, data.cell.x + 2, data.cell.y + data.cell.height / 2 + 3);
            }
        },
        styles: { font: 'helvetica', fontSize: 10 },
        theme: 'grid',
        headStyles: {
            fillColor: [255, 165, 0], // orange-600 equivalent in RGB
            textColor: [255, 255, 255], // white
        }
    });

    // Save the PDF
    doc.save('training-plan.pdf');
}

// Then, you can call `downloadPdf(trainingPlan)` when the user clicks a button.
