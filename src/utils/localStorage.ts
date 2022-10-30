export const getItemFromLS = (stateName: string) => {
    try {
      const dataFromLS = localStorage.getItem(stateName);
      if (dataFromLS === null) {
        return undefined;
      }
      return JSON.parse(dataFromLS);
    } catch (err) {
      return undefined;
    }
  }
  
  export const saveItemToLS = (stateName: string, data: any) => {
    localStorage.setItem(stateName, JSON.stringify(data));
  }