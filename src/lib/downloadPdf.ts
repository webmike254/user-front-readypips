export function downloadCoursePdf() {
  const link = document.createElement("a");
  link.href = "/reay-pips-course.pdf";
  link.download = "ReadyPips-Basics-of-Forex-Trading.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}