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

//https://leetcode.com/problems/partition-labels/
let partitionLabels = function(s) {
    let arr: number[] = [];
    let lastIndex = {};
    let start=0; let end = 0;
    for(let i = 0; i< s.length; i++){
        lastIndex[s[i]]=i;
    };
    for(let j = 0; j<s.length; j++){
        end = Math.max(end, lastIndex[s[j]]);
        if(j===end){
            arr.push(j-start+1);
            start = j+1;
        }
    }
    return arr;
};

//https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/
// As it doesn't have transaction limit, we can just add all the positive differences
let maxProfit = function(prices) {
    let maxOutput = 0;
    for(let i = 1; i<prices.length; i++){
        if(prices[i]>=prices[i-1]){
            maxOutput = prices[i]-prices[i-1]+maxOutput
        }
    }
    return maxOutput;
};

/* Chapter 2_Two Pointers */

//https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
// when iteration time is not fixed, we use two pointers with while loop; when iteration time is fixed, we use for loop
let twoSum = function(numbers, target) {
    let i = 0;
    let j = numbers.length-1;
    while(i<j){
        let sum = numbers[i]+numbers[j]
        if(sum === target){
            break;
        }else if(sum > target){
            j--;
        }else{
            i++;
        }
    }
    return [i+1, j+1];
};

//https://leetcode.com/problems/merge-sorted-array/
// try think from back to start.
let merge = function(nums1, m, nums2, n) {
    let i = m-1;
    let j = n-1;
    let p = m+n-1;
    while(i>=0&&j>=0){
        if(nums1[i]>=nums2[j]){
            nums1[p]=nums1[i];
            i--;
        }else if(nums1[i]<nums2[j]){
            nums1[p]=nums2[j];
            j--;
        };
        p--;
    }
    while(j>=0){
        nums1[p]=nums2[j];
        j--;
        p--;
    }
};

//TO REVIEW
// https://leetcode.com/problems/minimum-window-substring/
let minWindow = function(s, t) {
    // edge case? s.length<t.length
    let tMap = new Map(); // tMap: count t's chars
    for(let i of t){
        tMap.set(i, (tMap.get(i) || 0)+1)
    }
    let left = 0;
    let right = 0;
    let required = tMap.size; // number of unique chars in t
    let formed = 0; // number of unique chars in current window that match t's requirement
    let wMap = new Map(); // fq map for current window
    let result = [Infinity, 0, 0]
    // since the loop amount is unknown, use while instead of for
    while(right < s.length){
        let char = s[right];
        wMap.set(char, (wMap.get(char) || 0)+1);
        if(tMap.has(char) && wMap.get(char)===tMap.get(char)){
            formed++;
        };
        while(left<=right && formed === required){
            char = s[left];
            if(right-left+1<result[0]){
                result = [right - left +1, left, right];
            }
            wMap.set(char, wMap.get(char)-1);
            if(tMap.has(char) && wMap.get(char)<tMap.get(char)){
            formed--;
            // this is to check if the left pointer remove the needed char, if so, this formed is reduced and the loop ends. therefore the result from last loop cycle will be used.
            };
            left++;
        };
        right++;
    }
    return result[0] === Infinity ? "" : s.substring(result[1], result[2]+1);
};