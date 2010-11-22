module.exports.camelize = function(string,lowFirstLetter)
{
  var str=string.toLowerCase();
  var str_path=str.split('/');
  for(var i=0;i<str_path.length;i++)
  {
    var str_arr=str_path[i].split('_');
    var initX=((lowFirstLetter&&i+1==str_path.length)?(1):(0));
    for(var x=initX;x<str_arr.length;x++)
      str_arr[x]=str_arr[x].charAt(0).toUpperCase()+str_arr[x].substring(1);
    str_path[i]=str_arr.join('');
  }
  str=str_path.join('::');
  return str;
};

module.exports.pluralize = function(str){
  var uncountable_words = ['equipment','information','rice','money','species','series','fish','sheep',
  'moose','deer','news'];
  
  var plural_rules = [
    [new RegExp('(m)an$','gi'),'$1en'],
    [new RegExp('(pe)rson$','gi'),'$1ople'],
    [new RegExp('(child)$','gi'),'$1ren'],
    [new RegExp('^(ox)$','gi'),'$1en'],
    [new RegExp('(ax|test)is$','gi'),'$1es'],
    [new RegExp('(octop|vir)us$','gi'),'$1i'],
    [new RegExp('(alias|status)$','gi'),'$1es'],
    [new RegExp('(bu)s$','gi'),'$1ses'],
    [new RegExp('(buffal|tomat|potat)o$','gi'),'$1oes'],
    [new RegExp('([ti])um$','gi'),'$1a'],
    [new RegExp('sis$','gi'),'ses'],
    [new RegExp('(?:([^f])fe|([lr])f)$','gi'),'$1$2ves'],
    [new RegExp('(hive)$','gi'),'$1s'],
    [new RegExp('([^aeiouy]|qu)y$','gi'),'$1ies'],
    [new RegExp('(x|ch|ss|sh)$','gi'),'$1es'],
    [new RegExp('(matr|vert|ind)ix|ex$','gi'),'$1ices'],
    [new RegExp('([m|l])ouse$','gi'),'$1ice'],
    [new RegExp('(quiz)$','gi'),'$1zes'],
    [new RegExp('s$','gi'),'s'],
    [new RegExp('$','gi'),'s']
  ];
  
  var uncountable=false;
  
  for(var x=0;!uncountable&&x<uncountable_words.length;x++)
    uncountable=(uncountable_words[x]==str.toLowerCase()
  );
  
  if(!uncountable) 
  {
    var matched=false;
    for(var x=0;!matched&&x<plural_rules.length;x++)
    {
      matched=str.match(plural_rules[x][0]);
      if(matched)
        str=str.replace(plural_rules[x][0],plural_rules[x][1]);
    }
  }
  
  return str;
};