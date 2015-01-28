
function rgb2hsv(rgb)
{
  r=rgb[0]/255; g=rgb[1]/255; b=rgb[2]/255;
  M=Math.max(r,g,b)
  m=Math.min(r,g,b)
  C=M-m
  if (C==0) {
    h=0;
  } else if (M==r) {
    h=((g-b)/C)%6;
  } else if (M==g) {
    h=(b-r)/C+2;
  } else {
    h=(r-g)/C+4;
  }
  h*=60;
  if (h<0)
    h+=360;
  v=M;;
  if (v==0) {
    s=0;
  } else {
    s=C/v;
  }
  s*=100;
  v*=100
  return [h,s,v]
}

function hsv2rgb(hsv)
{
  h=hsv[0]%360; s=hsv[1]/100; v=hsv[2]/100;
  C=v*s;
  hh=h/60;
  X=C*(1-Math.abs(hh%2-1));
  r=g=b=0;
  if (hh>=0 && hh<1) {
    r=C;
    g=X;
  } else if (hh>=1 && hh<2) {
    r=X;
    g=C;
  } else if (hh>=2 && hh<3) {
    g=C;
    b=X;
  } else if (hh>=3 && hh<4) {
    g=X;
    b=C;
  } else if (hh>=4 && hh<5) {
    r=X;
    b=C;
  } else {
    r=C;
    b=X;
  }
  m=v-C;
  r+=m;
  g+=m;
  b+=m;
  r*=255;
  g*=255;
  b*=255;
  r=Math.floor(r);
  g=Math.floor(g);
  b=Math.floor(b);
  return [r,g,b]
}

function hex(n)
{
  a=n.toString(16);
  if (a.length<2) {
    a="0"+a;
  }
  return a.toUpperCase();
}

function arr2hex(rgb)
{
  return hex(rgb[0])+hex(rgb[1])+hex(rgb[2]);
}

function hex2arr(h)
{
  r=parseInt(h.substring(0,2),16);
  g=parseInt(h.substring(2,4),16);
  b=parseInt(h.substring(4,6),16);
  return [r,g,b];
}
  

function grad(tuple1,tuple2,n)
{
  if (n<2)
    return null;
  nn=n-1
  ret=Array();
  a=Array();
  ret.push(tuple1);
  for (j=1; j<nn; ++j) {
    for (i=0; i<3; ++i) {
      a[i]=tuple1[i]+(tuple2[i]-tuple1[i])*j/nn;
    }
    ret.push(a.slice());
  }
  ret.push(tuple2);
  return ret;
}

function gradient(hex1,hex2,n)
{
  hsv1=rgb2hsv(hex2arr(hex1));
  hsv2=rgb2hsv(hex2arr(hex2));
  if (Math.abs(hsv1[0]-hsv2[0])>180) {
    if (hsv1[0]<hsv2[0]) {
      hsv1[0]+=360;
    } else {
      hsv2[0]+=360;
    }
  }
  a=grad(hsv1,hsv2,n);
  l=[];
  a.forEach(function (e,i) {
    l.push(arr2hex(hsv2rgb(e)));
  });
  return l;
}


function test() {
  c=[0,255,0];
  d=rgb2hsv(c);
  e=hsv2rgb(d);
  console.log(d);console.log(e);
  console.log(grad([100,0,0],[200,0,0],5));
  console.log(gradient([0,100,0],[200,0,0],5));
  console.log(arr2hex([255,0,128]));
}

