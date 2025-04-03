const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-HN", {
      style: "currency",
      currency: "HNL",
      minimumFractionDigits: 2,
    }).format(value);
  };

export default formatCurrency;