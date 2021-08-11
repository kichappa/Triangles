# Performance Testing
## Accessing Object vs Array
---

The code is setup as follows.
```
var rgbObj = {r: 230, g: 183, b:124};
var rgbArr = [230, 183, 124];
```

Looping action over the object and arrays as follows is performed.
``` js
// 1 Object
let ans = 0;
for (let key in rgbObj)
  ans+=rgbObj[key];

// 2 Array
let ans = 0;
for (let i in rgbArr)
  ans+=rgbArr[i];
```
### Results
The results for the test is accessible [here](https://jsben.ch/12NtU)

|#|Method|Score|
|:--:|--:|:--|
|1|🏆 Object|4665271|
|2| Array|2911932|

Accessing object seems to be the faster method.

## Looping Array/Obj and performing math
---
The code is setup as follows.
```js
colour = {hsv: {h:248.61464048872585,s:0.855716645141105,v:0.6475592797293602},
          rgb:{r:44.112996560413016,g:23.82516646408723,b:165.12761633098685,a:1}
         };

cArray = [[248.61464048872585,0.855716645141105,0.6475592797293602],
          [44.112996560413016,23.82516646408723,165.12761633098685,1]
         ];
d = 162;
```

Looping action over the object and arrays as follows is performed.
``` js
// 1: Accessing Obj each time, saving into Array
var hsv=[0,0,0], rgb=[0,0,0]; 
hsv[1] += 1/d*colour.hsv.s;
hsv[2] += 1/d*colour.hsv.v;

rgb[0] += 1/d*colour.rgb.r;
rgb[1] += 1/d*colour.rgb.g;
rgb[2] += 1/d*colour.rgb.b;

// 2: Accessing Obj once, saving into Array
var hsv=[0,0,0], rgb=[0,0,0], hsvObj = colour.hsv, rgbObj = colour.rgb;

hsv[1] += 1/d*hsvObj.s;
hsv[2] += 1/d*hsvObj.v;

rgb[0] += 1/d*rgbObj.r;
rgb[1] += 1/d*rgbObj.g;
rgb[2] += 1/d*rgbObj.b;

// 3: Accessing Obj each time, saving into Obj
var hsv={h:0,s:0,v:0}, rgb={r:0,g:0,b:0}; 
hsv.s += 1/d*colour.hsv.s;
hsv.v += 1/d*colour.hsv.v;

rgb.r += 1/d*colour.rgb.r;
rgb.g += 1/d*colour.rgb.g;
rgb.b += 1/d*colour.rgb.b;

// 4: Accessing Obj once, saving into Obj
var hsv={h:0,s:0,v:0}, rgb={r:0,g:0,b:0}, hsvObj = colour.hsv, rgbObj = colour.rgb; 
hsv.s += 1/d*hsvObj.s;
hsv.v += 1/d*hsvObj.v;

rgb.r += 1/d*rgbObj.r;
rgb.g += 1/d*rgbObj.g;
rgb.b += 1/d*rgbObj.b;

// 5: Accessing Array each time, saving into Array
var hsv=[0,0,0], rgb=[0,0,0]; 
hsv[1] += 1/d*cArray[0][1];
hsv[2] += 1/d*cArray[0][2];

rgb[0] += 1/d*cArray[1][0];
rgb[1] += 1/d*cArray[1][1];
rgb[2] += 1/d*cArray[1][2];

// 6: Accessing Array once, saving into Array
var hsv=[0,0,0], rgb=[0,0,0], hsvArr = cArray[0], rgbArr = cArray[1];

hsv[1] += 1/d*hsvArr[1];
hsv[2] += 1/d*hsvArr[2];

rgb[0] += 1/d*rgbArr[0];
rgb[1] += 1/d*rgbArr[1];
rgb[2] += 1/d*rgbArr[2];

// 7: Accessing Array each time, saving into Obj
var hsv={h:0,s:0,v:0}, rgb={r:0,g:0,b:0}; 
hsv.s += 1/d*cArray[0][1];
hsv.v += 1/d*cArray[0][2];

rgb.r += 1/d*cArray[1][0];
rgb.g += 1/d*cArray[1][1];
rgb.b += 1/d*cArray[1][2];

// 8: Accessing Array once, saving into Obj
var hsv={h:0,s:0,v:0}, rgb={r:0,g:0,b:0}, hsvArr = cArray[0], rgbArr = cArray[1]; 
hsv.s += 1/d*hsvArr[1];
hsv.v += 1/d*hsvArr[2];

rgb.r += 1/d*rgbArr[0];
rgb.g += 1/d*rgbArr[1];
rgb.b += 1/d*rgbArr[2];
```
### Results
The results for the test is accessible [here](https://jsben.ch/12NtU)

|#|Method|Score|
|:--:|--:|:--|
|2| 🏆 Object once ==> Array |5048569|
|3| Object each time ==> Object |5032865|
|1| Object each time ==> Array |5028487|
|7| Array each time ==> Object |5003340|
|6| Array once ==> Array |4998662|
|8| Array once ==> Object |4993532|
|5| Array each time ==> Array |4959099|
|4| Object once ==> Object |4949869|

Accessing object once and saving into array seems fastest seems to be the faster method.