import dayjs from 'dayjs';

function formatDate(date: string, format: string): string {
  return dayjs(date).format(format);
}

function getDuration(dateFrom: string, dateTo: string): number {
  const dateFromMs: number = new Date(dateFrom).getTime();
  const dateToMs: number = new Date(dateTo).getTime();
  return (dateToMs - dateFromMs) / (1000 * 60);
}

function formatDuration(durationMinutes: number): string {
  const days: number = Math.floor(Number(durationMinutes) / (60 * 24));
  const hours: number = Math.floor((Number(durationMinutes) % (60 * 24)) / 60);
  const minutes: number = Math.floor(Number(durationMinutes) % 60);

  if (days > 0) {
    return `${days.toString()}D ${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  }

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  }

  return `${minutes.toString()}M`;
}

function readableFileSize(attachmentSize: number): string {
  const DEFAULT_SIZE: number = 0;
  const fileSize: number = attachmentSize ?? DEFAULT_SIZE;

  if (!fileSize) {
    return `${DEFAULT_SIZE} kb`;
  }

  const sizeInKb: number = fileSize / 1024;

  if (sizeInKb > 1024) {
    return `${(sizeInKb / 1024).toFixed(2)} mb`;
  } else {
    return `${sizeInKb.toFixed(2)} kb`;
  }
}

export {
  formatDate,
  getDuration,
  formatDuration,
  readableFileSize,
};
