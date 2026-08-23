// encode object to base64-url with prefix
function encodeShare(obj){
  try{
    const str = JSON.stringify(obj);
    const b = btoa(unescape(encodeURIComponent(str)));
    // make url-safe
    return 'pixiecode:' + b.replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
  }catch(e){return '';}
}

// decode code string back to object
function decodeShare(code){
  try{
    if(!code || !code.startsWith('pixiecode:')) return null;
    let b = code.slice('pixiecode:'.length);
    // restore padding
    b = b.replace(/-/g,'+').replace(/_/g,'/');
    while(b.length % 4) b += '=';
    const str = decodeURIComponent(escape(atob(b)));
    return JSON.parse(str);
  }catch(e){return null;}
}

// helper to auto-detect code in query param like ?c=PIX
function readCodeFromURL(){
  const params = new URLSearchParams(window.location.search);
  const c = params.get('c');
  if(c) return decodeShare(c);
  return null;
}

// Export on window for pages to use
window.encodeShare = encodeShare;
window.decodeShare = decodeShare;
window.readCodeFromURL = readCodeFromURL;
