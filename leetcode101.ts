/* Chapter 1_Greedy Algorithm */

// https://leetcode.com/problems/assign-cookies/
let cookieKid = (cookies, kids) => {
    //sort, index, length, loop, get target index, return
    cookies = cookies.sort((a, b) => a - b);
    kids = kids.sort((a, b) => a - b);
    let kidsIndex = 0;
    for (let i = 0; i < cookies.length; i++) {
      if (kidsIndex < kids.length && kids[kidsIndex] <= cookies[i]) {
        kidsIndex++;
      }
    }
    return kidsIndex;
  }; 


//https://leetcode.com/problems/candy/description/
let candy = function(ratings) {
  const candies = new Array(ratings.length).fill(1);
  // from index=1 to index = length-1
  for(let i = 1; i<=ratings.length-1; i++){
      if(ratings[i]>ratings[i-1]){
          candies[i]=candies[i-1]+1
      }
  };
  // from index=length-2 to index = 0, note that we need to compare the max value between the current value and the value from the right side
  for(let j = ratings.length-2; j>=0; j--){
      if(ratings[j]>ratings[j+1]){
          candies[j]=Math.max(candies[j], candies[j+1]+1)
      }
  }
  return candies.reduce((a, c) => a + c, 0);
};

//https://leetcode.com/problems/non-overlapping-intervals/
let eraseOverlapIntervals = function(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);
  let removed = 0;
  let compared = intervals[0][1];
  for(let i = 1; i<intervals.length;i++){
      if(intervals[i][0]<compared){
          removed++;
      }else{
          compared = intervals[i][1];
      }
  }
  return removed;
};

//https://leetcode.com/problems/can-place-flowers/
let canPlaceFlowers = function(flowerbed, n) {
  let canPlace = 0;
  if(flowerbed.length<3){
      if(flowerbed.find((e)=> e===1)){
          canPlace=0;
      }else{
          canPlace++;
      }
  }else{
          for(let i=0; i<flowerbed.length; i++){
      if(i===0){
          if(flowerbed[i]===0&&flowerbed[i+1]===0){
              flowerbed[i]=1;
              canPlace++;
          }
      }else if(i===flowerbed.length-1){
          if(flowerbed[i-1]===0 && flowerbed[i]===0){
              canPlace++;
          }
      } else if (flowerbed[i-1]===0&&flowerbed[i]===0&&flowerbed[i+1]===0){
              canPlace++;
              flowerbed[i]=1;
          }
  }
  }
  return canPlace>=n;
};

//better solution
let canPlaceFlowers2 = function(flowerbed, n) {
  let canPlace = 0;
  
  // Loop through the flowerbed
  for (let i = 0; i < flowerbed.length; i++) {
      // Check if we can place a flower in the current spot
      if (flowerbed[i] === 0 &&
          (i === 0 || flowerbed[i - 1] === 0) && // No flower on the left
          (i === flowerbed.length - 1 || flowerbed[i + 1] === 0)) { // No flower on the right
          flowerbed[i] = 1; // Place a flower here
          canPlace++;
      }
      
      // Early exit if we've placed enough flowers
      if (canPlace >= n) {
          return true;
      }
  }
  
  return canPlace >= n; // Return if we placed enough flowers
};

//https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/
let findMinArrowShots = function(points) {
    //1-sort; 2-find intersection (1 -> update smaller intersection; 0 -> shots+1, reassign intersection)
    points.sort((a,b)=> a[1]-b[1]);
    let shots = 1;
    if(points.length > 1){
        let x=points[0];
        for(let i = 0; i<points.length-1; i++){
            if(x[1] >= points[i+1][0]){
                x = [Math.max(x[0], points[i+1][0]),Math.min(x[1], points[i+1][1])]
            }else{
                x = points[i+1]
                shots++;
            }
        }
    }
    return shots;
}