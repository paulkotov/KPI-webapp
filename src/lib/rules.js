let rulesList = [];

function rules(data){
  if (typeof data !== 'object') {
    return rulesList;
  }
  data.map( item => {
    rulesList.push(item.name);
    if (item.children !== 'undefined'){
      rules(item.children);
    }
  });
  return rulesList;
}

export function setRules(data){
  rules(data);
  return rulesList;
}