
import { jsPDF } from "jspdf";

export const convertImagesToPdf = async (images: File[]): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    if (!images.length) {
      reject(new Error("No images provided"));
      return;
    }

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
    });

    const loadImage = (file: File): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
      });
    };

    const processImages = async () => {
      let isFirstPage = true;

      for (const image of images) {
        try {
          const img = await loadImage(image);
          
          // Add a new page for each image except the first one
          if (!isFirstPage) {
            doc.addPage();
          }
          
          // Calculate optimal dimensions to fit the image on the page
          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();
          
          const imgRatio = img.width / img.height;
          const pageRatio = pageWidth / pageHeight;
          
          let finalWidth = pageWidth;
          let finalHeight = pageWidth / imgRatio;
          
          if (finalHeight > pageHeight) {
            finalHeight = pageHeight;
            finalWidth = pageHeight * imgRatio;
          }
          
          // Center the image on the page
          const x = (pageWidth - finalWidth) / 2;
          const y = (pageHeight - finalHeight) / 2;
          
          // Add the image to the PDF
          doc.addImage(
            img,
            'JPEG',
            x,
            y,
            finalWidth,
            finalHeight
          );
          
          isFirstPage = false;
        } catch (error) {
          console.error(`Error processing image: ${image.name}`, error);
        }
      }

      // Generate PDF as blob
      const pdfOutput = doc.output('blob');
      resolve(pdfOutput);
    };

    processImages().catch(reject);
  });
};

export const downloadPdf = (pdfBlob: Blob, filename: string = "converted.pdf") => {
  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 100);
};
