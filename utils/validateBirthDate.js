const getYearsAgo = (ago) => {
  const res = new Date().setFullYear(new Date().getFullYear() - ago);

  return res;
};

export const validateBirthDate = (birthDate) => {
  const time = birthDate.getTime();

  const eighteenYearsAgo = getYearsAgo(18);
  const hundredYearsAgo = getYearsAgo(100);

  if (time > eighteenYearsAgo || time < hundredYearsAgo) {
    return false;
  }

  return true;
};
