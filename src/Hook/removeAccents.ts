export  const  removeAccents = (str : any )  => {
    const accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    const accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
    str = str.split('');
    str.forEach((letter:string, index : string) => {
      const i = accents.indexOf(letter);
      if (i !== -1) {
        str[index] = accentsOut[i];
      }
    });
    return str.join('');
  }