const getFetchData = async (url: string, cache: RequestCache) =>{
  try{
    const response = await fetch(url, {cache: cache})
    return response.json();
  }catch(error){
    return error;
  }
}

export default getFetchData;