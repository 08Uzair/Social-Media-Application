"use client"
import React from 'react';

const FormattedDate = ({ dateString }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // 12-hour format
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return <span>{formatDate(dateString)}</span>;
};

export default FormattedDate;
