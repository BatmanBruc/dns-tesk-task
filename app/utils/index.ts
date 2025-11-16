const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return formatter.format(date);
};
