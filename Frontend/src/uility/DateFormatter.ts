export const formatDate = (date:Date)=>{
    const newDate = new Date(date);
  const options: any = { day: "numeric", month: "long", year: "numeric" };

  const formattedDate = newDate
    .toLocaleDateString("en-US", options)
    .replace(/(\d+)(st|nd|rd|th)/, "$1<sup>$2</sup>");
    return formattedDate
}