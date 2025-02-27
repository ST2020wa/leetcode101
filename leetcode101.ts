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

//https://leetcode.com/problems/linked-list-cycle-ii/
let detectCycle = function(head) {
    let isFirstRound = true;
    let fast = head;
    let slow = head;
    while(fast !== slow || isFirstRound){
        if(fast !== null && fast.next !== null){
            slow = slow.next;
        fast = fast.next.next;
        }else{
            return null;
        }
        isFirstRound = false;
    };
    fast = head;
    while(fast !== slow){
        fast = fast.next;
        slow = slow.next;
    }
    return fast;
};

//https://leetcode.com/problems/sum-of-square-numbers/
let judgeSquareSum = function(c) {
    let a = 0;
    let b = Math.round(Math.sqrt(c));
    let result = false;
    while(a<=b && b>=0){
        let sum = a*a + b*b;
        if(sum === c){
            result = true;
            break;
        } else if(sum > c){
            b--;
        }else if (sum < c){
            a++;
        }
    }
    return result;
};

//https://leetcode.com/problems/valid-palindrome-ii/
{let validPalindrome = function(s) {
    let left = 0;
    let right = s.length-1;

    while(left<right){
        if(s[left]!==s[right]){
            return isValidPalindrome(s, left+1, right)||isValidPalindrome(s, left, right-1);
        }
        left++;
        right--;
    }
    return true;
};

// using the helper function below to find substring on both path (test case s="eceec")
function isValidPalindrome(s, l, r){
    while(l<r){
        if(s[l]!==s[r]){
            return false;
        }
        l++;
        r--;
    }
    return true;
}}

// https://leetcode.com/problems/longest-word-in-dictionary-through-deleting/
let findLongestWord = function(s, dictionary) {
    let longest = '';
    // 1-sort is expensive; 2-some words can be removed based on length; check description carefully for smallest lexicographical order
    for(let word of dictionary){
        // skip words longer than s or shorter than the current longest word
        if(word.length > s.length || word.length < longest.length){
            continue;
        };
        let i = 0; // dictionary's word pointer
        let j = 0; // s pointer
        while(i < word.length && j < s.length){
            if(word[i]===s[j]){
                i++;
            }
            j++;
        };
        if(i===word.length){
            // this means word is a substring of s, then check its length
            if(word.length>longest.length ||(word.length === longest.length && word < longest)){
                longest = word; // need compare same length words LEXICOGRAPHICAL ORDER based on description
            }
        }
    };
    return longest;
};

/* Chapter 3_Binary Search */
//https://leetcode.com/problems/sqrtx/description/
// (to be optimized)
let mySqrt = function(x) {
    let m = 0;
    if(x<=1){
        m = x;
        return m;
    }else{
        while(m<=x){
            let n = m*m;
            if(n<x){
                m++;
            } else if (n===x){
                return m;
                break;
            } else if (n>x) {
                return m-1;
                break;
            }
        }
    }
};

//https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/
let findLeft = (nums, target)=>{
    let left = 0;
    let r = nums.length;
    while(left<r){
        let m = Math.floor((left+r)/2);
        if(nums[m]<target){
            left = m+1;
        }else{
            r = m;
        }
    }
    return left;
};
let findRight = (nums, target)=>{
    let l = 0;
    let right = nums.length;
    while(l<right){
        let m = Math.floor((l+right)/2);
        if(nums[m]<=target){
            l = m+1;
        }else{
            right = m;
        };
    };
    return right;
}
let searchRange = function(nums, target) {
    let left = findLeft(nums, target);
    let right = findRight(nums, target)-1;
    if(nums.length === 0 || left === nums.length || left>right){
        return [-1, -1]
    }else{
        return [left, right];
    }
};

//https://leetcode.com/problems/find-peak-element/description/
let findPeakElement = function(nums) {
    if(nums[0]>nums[1] || nums.length===1){
        return 0;
    }else if(nums[nums.length-1] > nums[nums.length-2]){
        return nums.length-1;
    }else{
        let i = 1;
        let j = nums.length-2;
        while(i<=j){
            let k = Math.floor((i+j)/2)
            if(nums[k]>nums[k+1] && nums[k]>nums[k-1]){
                return k;
            }else if(nums[k]>nums[k-1]){
                i = k+1;
            }else{
                j = k-1;
            }
        }
    }
};

//https://leetcode.com/problems/search-in-rotated-sorted-array-ii/
let search = function(nums, target) {
    let l = 0;
    let r = nums.length-1;
    while(l<=r){
        let m = Math.floor((l+r)/2);
        if(nums[m]===target){
            return true;
        }else if(nums[l]===nums[m]){
            l++;
        }else if (nums[r]===nums[m]){
            r--;
        }else{
            if(nums[m]<nums[r]){
                if(nums[m]<target&&target<=nums[r]){
                    l = m+1;
                }else{
                    r = m-1;
                }
            }else{
                if(nums[l]<=target&&target<nums[m]){
                    r = m-1;
                }else{
                    l = m+1;
                }
            }
        }
    }
    return false;
};

//https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/
let findMin = function(nums) {
    let l = 0;
    let r = nums.length-1;
    let min=nums[0];
    while(l<=r){
        let m = Math.floor((l+r)/2);
        if(nums[m]===nums[l] && nums[m]===nums[r]){
            // If encounter duplicates, shrink the search space by moving `l` or `r`
            min = Math.min(min, nums[m])
            l++;
            r--;
        }else if(nums[m]<=nums[r]){
            min = Math.min(min, nums[m]);
            r = m-1;
        }else{
            l = m+1;
        }
    }
    return min;
};

//https://leetcode.com/problems/single-element-in-a-sorted-array/
// this is resolve in Time Complexity: O(n) and Space Complexity: O(1)
let singleNonDuplicate1 = function(nums) {
    let l = 0;
    let r = nums.length-1;
    if(nums.length === 1){
     return nums[0]
    }else{
        while(l<=r){
     if(nums[l]===nums[l+1]&&nums[r]===nums[r-1]){
         l = l+2;
         r = r-2;
     }else if(nums[l]===nums[l+1]&&nums[r]!==nums[r-1] || l === r){
         return nums[r];
     }else if(nums[r]===nums[r-1]&&nums[l]!==nums[l+1]){
         return nums[l];
     }
    }
    }
 };

 // for particiular requirement on complexity, use binary search to reach time complexity O(logn)
 let singleNonDuplicate2 = function(nums) {
    let l = 0;
    let r = nums.length-1;
    while (l<r){
     let m = Math.floor((l+r)/2);
     if(m%2===1){
         m--;
     }
     if(nums[m]===nums[m+1]){
         l = m+2;
     }else{
         r = m;
     }
    }
    return nums[l];
 };