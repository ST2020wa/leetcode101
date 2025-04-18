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

 /* Sort */
 //https://leetcode.com/problems/kth-largest-element-in-an-array/description/
 let findKthLargest = function(nums, k) {
    // p = Math.floor(Math.random()*(max-min+1)+min), max: nums.length-1, min: 0
    let p = Math.floor(Math.random() * nums.length)
    let high = [], equal = [], low = [];
    for(let n of nums){
        if(n>nums[p]){
            high.push(n)
        }else if(n===nums[p]){
            equal.push(n)
        }else{
            low.push(n)
        }
    }
    if(k<=high.length){
        return findKthLargest(high, k)
    }else if(k>(high.length + equal.length)){
        return findKthLargest(low, (k-high.length-equal.length))
    }else{
        return nums[p]
    }
};

//https://leetcode.com/problems/top-k-frequent-elements/
let topKFrequent = function(nums, k) {
    let store = new Map(); // key: item in nums, value: item's frequency
    for(let n of nums){
        if(store.has(n)){
            store.set(n, store.get(n)+1);
        }else{
            store.set(n,1);
        }
    }
    let sortByFrequency = [...store].sort((a,b)=> b[1]-a[1])
    let tops: (typeof sortByFrequency[0][0])[] = [];
    let i = 0;
    while(k>0){
        tops.push(sortByFrequency[i][0]);
        k--;
        i++;
    }
    return tops;
};

//https://leetcode.com/problems/sort-characters-by-frequency/
let frequencySort = function(s) {
    let store = []; // [character, frequency][]
    for(let char of s){
     let el = store.find((el) => el[0] === char);
     if(el){
         el[1]++;
     }else{
         store.push([char, 1])
     }
    };
    store.sort((a,b)=> b[1]-a[1]);
    let result = '';
    store.forEach((data)=>{
     for(let i = 1; i<=data[1]; i++){
         result = result.concat('',data[0])
     }
    })
    return result;
 };

 /* Search */
 //https://leetcode.com/problems/max-area-of-island/
 // resolution 1: DFS stack (runtime 2ms, memory 57.9mb)
 let maxAreaOfIsland1 = function(grid) {
    const direction = [-1, 0, 1, 0, -1];
    let m = grid.length, n = grid[0].length, maxArea = 0;
    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            if(grid[i][j]){
                let island = [];
                let localArea=1;
                grid[i][j]=0;
                island.push([i,j]);
                while(island.length){
                    let [r, c] = island.pop();
                    for(let k=0; k < 4; k++){
                        let x = r+direction[k], y=c+direction[k+1];
                        if((x>=0&&x<m)&&(y>=0&&y<n)&&(grid[x][y]===1)){
                            localArea++;
                            grid[x][y]=0;
                            island.push([x,y])
                        }
                    }
                }
                maxArea=Math.max(maxArea,localArea)
            }
        }
    }
    return maxArea;
};

//resolution 2: recursion (runtime 3ms, memory 56.45mb)
let dfs=(grid, r, c)=>{
    if(r<0 || r>=grid.length || c<0 ||c>=grid[0].length || grid[r][c]===0){
        return 0;
    };
    grid[r][c]=0;
    return(1+dfs(grid,r+1,c)+dfs(grid,r-1,c)+dfs(grid,r,c+1)+dfs(grid,r,c-1))
};
let maxAreaOfIsland2 = function(grid) {
    let maxArea = 0;
    for(let i=0; i<grid.length; i++){
        for(let j = 0; j<grid[0].length; j++){
            maxArea = Math.max(maxArea, dfs(grid, i,j))
        }
    }
    return maxArea;
};

//https://leetcode.com/problems/number-of-provinces/
let dfs1=(isConnected, city, visited)=>{
    visited.add(city);
    for(let i=0; i<isConnected.length; i++){
        if(isConnected[city][i] && !visited.has(i)){
            dfs(isConnected, i, visited)
        }
    }
 }
let findCircleNum = function(isConnected) {
    let count = 0;
    let visited = new Set();
    for(let i = 0;i<isConnected.length; i++){
        if(!visited.has(i)){
            dfs1(isConnected,i,visited)
            count++
        }
    }
    return count;
};

//https://leetcode.com/problems/pacific-atlantic-water-flow/description/
let direction = [-1,0,1,0,-1];
let oceanDfs = (heights, canReach, r, c)=>{
    if(canReach[r][c]){
        return;
    };
    canReach[r][c]=true;
    for(let i = 0;i<4;i++){
        let x=r+direction[i], y=c+direction[i+1]
        if((x>=0&&x<heights.length)&&(y>=0&&y<heights[0].length)&&(heights[x][y]<=heights[r][c])){
            oceanDfs(heights, canReach, x, y)
        }
    }
}
let pacificAtlantic = function(heights) {
    let m = heights.length, n=heights[0].length;
    const canReachP = Array.from({ length: m }, () => Array(n).fill(false));
    const canReachA = Array.from({ length: m }, () => Array(n).fill(false));
    for(let i=0;i<m;i++){
        oceanDfs(heights, canReachP, i, 0);
        oceanDfs(heights, canReachA, i, n-1);
    };
    for(let j=0;j<n;j++){
        oceanDfs(heights, canReachP, 0, j);
                oceanDfs(heights, canReachA, m-1,j);
    }
    const canReach = [];
    for(let i = 0; i<m; i++){
        for(let j = 0; j<n; j++){
            if(canReachA[i][j]&&canReachP[i][j]){
                canReach.push([i,j])
            }
        }
    }
    return canReach;
};

//https://leetcode.com/problems/permutations/
let subPermute = (nums, level, permuteResult)=>{
    if(level === nums.length-1){
        permuteResult.push([...nums]);
    }else{
        for(let i = level; i<nums.length; i++){
            [nums[level], nums[i]] = [nums[i], nums[level]];
            subPermute(nums, level+1, permuteResult);
            [nums[i], nums[level]] = [nums[level], nums[i]];
        }
    }
 }
let permute = function(nums) {
    let result = [];
    subPermute(nums, 0, result);
    return result;
};

//https://leetcode.com/problems/combinations/
let backtracking=(combinations, pick, pos, n, k)=>{
    if(pick.length === k){
        combinations.push([...pick])
    }
    for(let i=pos; i<n+1; i++){
        pick.push(i)
        backtracking(combinations, pick, i+1, n, k)
        pick.pop();
    }
}
let combine = function(n, k) {
    let combinations = [], pick = []
    backtracking(combinations, pick, 1, n, k)
    return combinations
};

//https://leetcode.com/problems/word-search/
let backtrackingWS = (board, word, visited, i, j, word_pos)=>{
    if(i<0 || i>= board.length || j<0 || j>=board[0].length || visited[i][j] || board[i][j]!==word[word_pos]){
        return false;
    }
    if(word_pos === word.length -1){
        return true;
    }
    visited[i][j]=true;
    if(backtrackingWS(board, word, visited, i-1, j, word_pos+1)||backtrackingWS(board, word, visited, i+1, j, word_pos+1)|| backtrackingWS(board, word, visited, i, j-1, word_pos+1)||backtrackingWS(board, word, visited, i, j+1, word_pos+1)){
        return true;
    };
    visited[i][j]=false;
    return false;
};
let exist = function(board, word) {
    if (board.length === 0 || word.length === 0) {
        return false;
    }
    let m = board.length, n = board[0].length;
    let visited = new Array(m).fill().map(() => new Array(n).fill(false));
    for(let i = 0; i<m; i++){
        for(let j = 0; j<n; j++){
            if(backtrackingWS(board, word, visited, i, j, 0)){
                return true;
            }
        }
    }
    return false;
};

//https://leetcode.com/problems/n-queens/description/
let backtrackingQ=(solutions, board, column, ldiag, rdiag, row)=>{
    const n = board.length;
    if(row === n){
        solutions.push(board.map(row => row.join('')));
        return;
    }
    for(let i = 0; i<n; i++){
        if(column[i]||ldiag[n-row+i-1]||rdiag[row +i]){
            continue
        }
        board[row][i]="Q"
        column[i]=ldiag[n-row+i-1]=rdiag[row+i]=true;
        backtrackingQ(solutions, board, column, ldiag, rdiag, row+1)
        board[row][i]="."
        column[i]=ldiag[n-row+i-1]=rdiag[row+i]=false;
    }
}
let solveNQueens = function(n) {
    const solutions = [];
    const board = new Array(n).fill().map(()=> new Array(n).fill('.'));
    const column = new Array(n).fill(false);
    const ldiag = new Array(2*n - 1).fill(false);
    const rdiag = new Array(2*n - 1).fill(false);
    backtrackingQ(solutions, board, column, ldiag, rdiag, 0);
    return solutions;
};

//https://leetcode.com/problems/shortest-path-in-binary-matrix/
let shortestPathBinaryMatrix = function(grid) {
    if(grid[0][0]===1)return -1;
    let m = grid.length, n = grid[0].length, dist = 0, q = [];
    q.push([0,0]);
    grid[0][0] = -1;
    let count = q.length;
    while(count > 0){
        dist++;
        while(count > 0){
            count--;
            let [r, c] = q.shift();
            if(r === m-1 && c === n-1){
                return dist;
            } 
            for(dx=-1;dx<2;dx++){
                for(dy=-1;dy<2;dy++){
                    if(dx === 0 && dy === 0)continue;
                    let x=r+dx, y=c+dy;
                    if(x<0 || y<0 || x>=m || y>=n || grid[x][y]!==0)continue;
                    grid[x][y]=-1;
                    q.push([x, y])
                }
            }
        }
        count = q.length;
    }
    return -1;
};

// https://leetcode.com/problems/shortest-bridge/
let ShortestBridge=()=>{
    let direction = [-1,0,1,0,-1];
let dfs=(points, grid, i, j)=>{
   let m = grid.length, n = grid[0].length;
   if(i<0 || i>=m || j<0 || j>= n || grid[i][j]===2)return;
   if(grid[i][j]===0){
       points.push([i,j]);return;
       }
   grid[i][j]=2;
   for(let k = 0; k<4; k++){
       dfs(points, grid, i+direction[k], j+direction[k+1])
   }
}
let shortestBridge = function(grid) {
   let m = grid.length, n = grid[0].length, points = [], flipped = false;
   for(let i = 0; i<m; i++){
       if(flipped)break;
       for(let j = 0; j<n; j++){
           if(grid[i][j]===1){
               dfs(points, grid, i, j);
               flipped = true;
               break;
           }
       }
   }
   let level = 0;
   while(points.length > 0){
       level++;
       let pointCurrent = points.length;
       for(let i=0; i<pointCurrent; i++){
           let [r,c]=points.shift();
           grid[r][c]=2;
           for(let k = 0; k<4; k++){
               let x = r+direction[k], y=c+direction[k+1];
               if(x>=0&&x<m&&y>=0&&y<n){
                   if(grid[x][y]===2)continue;
                   if(grid[x][y]===1)return level;
                   grid[x][y]=2;
                   points.push([x,y])
               }
           }
       }
   }
   return level;
};
}

//https://leetcode.com/problems/surrounded-regions/
let surroundedRegions = ()=>{
    let solve=(board)=>{
        if(!board || board.length === 0)return;
        let m = board.length,n=board[0].length;
    
        let dfs=(i,j)=>{
            if(i<0||i>=m||j<0||j>=n||board[i][j]!=='O')return;
            board[i][j]="T"
            dfs(i+1,j);dfs(i-1,j);dfs(i,j+1);dfs(i,j-1);
        }
        for(let i=0;i<m;i++){
            dfs(i,0);dfs(i,n-1); // first and last row
        }
        for(let j=0;j<n;j++){
            dfs(0,j);dfs(m-1,j); // first and last column
            }
            for(let i=0;i<m;i++){
                for(let j=0;j<n;j++){
                    if(board[i][j]==='O')board[i][j]='X';
                    if(board[i][j]==='T')board[i][j]='O';
                }
            }
    }
}

//https://leetcode.com/problems/binary-tree-paths/
let binaryTreePath = ()=>{
    let binaryTreePaths = function(root) {
        const paths=[];
   let dfs=(node,currentPath)=>{
       if(!node)return;
       currentPath += node.val;
       if(!node.left&&!node.right){
           paths.push(currentPath);
           return;
       }
       if(node.left){
           dfs(node.left, currentPath + "->");
       }
       if(node.right){
           dfs(node.right, currentPath + '->')
       }
   }
   dfs(root, "");
   return paths;
   };
}

//https://leetcode.com/problems/climbing-stairs/
let climbStairs = function(n) {
    let arr= new Array(n+1).fill(1);
    for(let i=2;i<=n;i++){
        arr[i]=arr[i-2]+arr[i-1]
    }
    return arr[n];
};

//https://leetcode.com/problems/house-robber/description/
let rob = function(nums) {
    let pre_pre = 0, pre = 0, cur = 0;
    for(let i = 0; i<nums.length; i++){
        cur = Math.max(pre_pre+nums[i], pre)
        pre_pre = pre;
        pre = cur;
    }
    return cur;
};

//https://leetcode.com/problems/arithmetic-slices/
let numberOfArithmeticSlices = function(nums) {
    let n = nums.length;
    let dp = new Array(n).fill(0);
    for(let i = 2; i<n; i++){
        if(nums[i]-nums[i-1]===nums[i-1]-nums[i-2]){
            dp[i]=dp[i-1]+1
        }
    }
    return dp.reduce((a, c) => a + c,0,)
};

//https://leetcode.com/problems/minimum-path-sum/
let minPathSum = function(grid) {
    let m = grid.length, n = grid[0].length;
    const dp = new Array(m);
    for(let i = 0; i<m; i++){
        dp[i]=new Array(n).fill(0);
    }
    for(let i = 0; i<m; i++){
        for(let j= 0; j<n; j++){
            if(i===j&&i===0){
                dp[i][j]=grid[i][j]
            }else if (i===0){
                dp[i][j]=grid[i][j]+dp[i][j-1]
            }else if(j===0){
                dp[i][j]=grid[i][j]+dp[i-1][j]
            }else{
                dp[i][j]=grid[i][j]+Math.min(dp[i][j-1], dp[i-1][j])
            }
        }
    }
    return dp[m-1][n-1]
};

//https://leetcode.com/problems/01-matrix/
let updateMatrix = function(mat) {
    let m = mat.length, n=mat[0].length;
    const dp = [];
    for (let i = 0; i < m; i++) {
    dp.push(Array(n).fill(Number.MAX_SAFE_INTEGER - 1));
    }
    for(let i = 0; i<m; i++){
        for(let j=0; j<n; j++){
            if(mat[i][j]!==0){
                            if(i>0){
                dp[i][j]=Math.min(dp[i][j], dp[i-1][j]+1)
            }
            if(j>0){
                dp[i][j]=Math.min(dp[i][j], dp[i][j-1]+1)
            }
            }else{
                dp[i][j]=0;
            }
        }
    }
        for(let i = m-1; i>=0; i--){
        for(let j=n-1; j>=0; j--){
            if(mat[i][j]!==0){
                            if(i<m-1){
                dp[i][j]=Math.min(dp[i][j], dp[i+1][j]+1)
            }
            if(j<n-1){
                dp[i][j]=Math.min(dp[i][j], dp[i][j+1]+1)
            }
            }
        }
    }
    return dp;
};

//https://leetcode.com/problems/maximal-square/
let maximalSquare = function(matrix) {
    let m = matrix.length, n=matrix[0].length;
    let max=0;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for(let i=1; i<m+1; i++){
        for(let j=1; j<n+1; j++){
            if(matrix[i-1][j-1]==="1"){
                dp[i][j] = Math.min(dp[i-1][j-1], dp[i][j-1], dp[i-1][j]) + 1;
            }
            max=Math.max(max, dp[i][j])
        }
    }
    return max*max;
};

//https://leetcode.com/problems/perfect-squares/
let numSquares = function(n) {
    const dp = Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
    dp[0]=0;
    for(let i = 1; i<n+1; i++){
        for(let j=1; j<Math.floor(Math.sqrt(i))+1; j++){
            dp[i]=Math.min(dp[i], dp[i-j*j]+1)
        }
    }
    return dp[n];
};

//https://leetcode.com/problems/word-break/
let wordBreak = function(s, wordDict) {
    let n = s.length;
    const dp = new Array(n+1).fill(false);
    dp[0]=true;
    for(let i = 1; i<=n; i++){
        for(let word of wordDict){
            let m= word.length;
            if(i>=m && s.substring(i-m, i)===word){
                dp[i]=dp[i-m]
            }
            if(dp[i]){
                break;
            }
        }
    }
    return dp[n];
};

//https://leetcode.com/problems/filling-bookcase-shelves
let minHeightShelves = function(books, shelfWidth) {
    let n = books.length;
    const dp = new Array(n+1).fill(0);
    for(let i=1; i<=n; i++){
        let w= books[i-1][0], h=books[i-1][1];
        dp[i]=dp[i-1]+h;
        for(let j=i-1;j>0;j--){
            w += books[j-1][0]; // Add width of book[j-1]
            if (w > shelfWidth) break; // Stop if exceeds shelf width
            h = Math.max(h, books[j-1][1]); // Update max height in current shelf
            dp[i] = Math.min(dp[i], dp[j-1] + h); // Compare with placing books[j..i] on the same shelf
        }
    }
    return dp[n]
};

//https://leetcode.com/problems/combination-sum-iv/description/
let combinationSum4 = function(nums, target) {
    const dp=new Array(target+1).fill(0);
    dp[0]=1;
    for(let i=1; i<target+1; i++){
        for(num of nums){
            if(num<=i){
                dp[i]+=dp[i-num]
            }
        }
    }
    return dp[target];
};

//https://leetcode.com/problems/longest-increasing-subsequence/
()=>{
    //time complex O(n2)
    let lengthOfLIS = function(nums) {
        let result=0, n=nums.length;
        const dp=new Array(n).fill(1)
        for(let i=0; i<n; i++){
            for(let j=0; j<i; j++){
                if(nums[i]>nums[j]){
                    dp[i] = Math.max(dp[i], dp[j]+1)
                }
            }
            result =Math.max(result, dp[i]);
        }
        return result;
    };
}
()=>{
    // time complex is lower: O(n log n)
    let lengthOfLIS = function(nums) {
        let dp = [nums[0]];
        for (const num of nums) {
            if (num > dp[dp.length - 1]) {
                dp.push(num);
            } else {
                // Binary search to find the insertion point
                let left = 0;
                let right = dp.length-1;
                while(left<right){
                    const mid = Math.floor((left+right)/2)
                    if(dp[mid]<num){
                        left = mid+1;
                    }else{
                        right=mid;
                    }
                }
                dp[left]=num;
            }
        }
        return dp.length;
    };
}

//https://leetcode.com/problems/longest-common-subsequence/
let longestCommonSubsequence = function(text1, text2) {
    const m = text1.length; const n=text2.length;
    const dp = new Array(m+1).fill().map(() => new Array(n+1).fill(0));
    for(let i = 1; i<m+1; i++){
        for(let j=1; j<n+1; j++){
            if(text1[i-1]===text2[j-1]){
                dp[i][j]=dp[i-1][j-1]+1
            }else{
                dp[i][j]=Math.max(dp[i-1][j], dp[i][j-1])
            }
        }
    }
    return dp[m][n];
};

//https://leetcode.com/problems/partition-equal-subset-sum
let canPartition = function(nums) {
    const numsSum = nums.reduce((a,c)=> a+c, 0);
    if(numsSum % 2 !== 0){
        return false;
    }
    const sum = numsSum/2;
    const n = nums.length;
    const dp = new Array(sum+1).fill(false);
    dp[0]=true;
    for(let i = 1; i<=n; i++){
        for(let j=sum; j>=nums[i-1]; j--){
            dp[j]=dp[j]||dp[j-nums[i-1]]
        }
    }
    return dp[sum]
};

//https://leetcode.com/problems/ones-and-zeroes/
let findMaxForm = function(strs, m, n) {
    //m->0 n->1
    const dp = new Array(m+1).fill().map(()=> Array(n+1).fill(0));
    for(const s of strs){
        let zeros = 0, ones = 0;
        for(const char of s){
            if(char==='0'){
                zeros++;
            }else{
                ones++;
            }
        }
        for(let i=m; i>=zeros; i--){
            for(let j=n; j>=ones; j--){
                dp[i][j]=Math.max(dp[i][j], dp[i-zeros][j-ones]+1)
            }
        }
    }
    return dp[m][n];
};

//https://leetcode.com/problems/ones-and-zeroes/
let findMaxForm = function(strs, m, n) {
    //m->0 n->1
    const dp = new Array(m+1).fill().map(()=> Array(n+1).fill(0));
    for(const s of strs){
        let zeros = 0, ones = 0;
        for(const char of s){
            if(char==='0'){
                zeros++;
            }else{
                ones++;
            }
        }
        for(let i=m; i>=zeros; i--){
            for(let j=n; j>=ones; j--){
                dp[i][j]=Math.max(dp[i][j], dp[i-zeros][j-ones]+1)
            }
        }
    }
    return dp[m][n];
};

//https://leetcode.com/problems/coin-change/
let coinChange = function(coins, amount) {
    const dp = new Array(amount+1).fill(amount+1);
    dp[0]=0;
    for(let i = 1; i<=amount; i++){
        for(let coin of coins){
            if(i>=coin){
                dp[i]=Math.min(dp[i], dp[i-coin]+1);
            }
        }
    }
    return dp[amount]!==amount + 1? dp[amount]: -1;
};

//https://leetcode.com/problems/edit-distance/
let minDistance = function(word1, word2) {
    const m= word1.length;
    const n= word2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for(let i=0; i<=m; i++){
        for(let j=0; j<=n; j++){
            if(i===0 || j===0){
                dp[i][j]=i+j;
            }else{
                dp[i][j]=dp[i-1][j-1]+(word1[i-1]!==word2[j-1]);
                dp[i][j] = Math.min(dp[i][j], dp[i - 1][j] + 1);
                dp[i][j] = Math.min(dp[i][j], dp[i][j - 1] + 1);
            }
        }
    }
    return dp[m][n];
};

//https://leetcode.com/problems/2-keys-keyboard/
let minSteps = function(n) {
    const dp = new Array(n+1).fill(0);
    for(let i=2; i<=n; i++){
        dp[i]=i;
        for(let i=2; i<=n; i++){
            dp[i]=i;
            for(let j=2; j*j<=i; j++){
                if(i%j===0){
                    dp[i]=dp[j]+dp[i/j];
                    break;
                }
            }
        }
    }
    return dp[n];
};

//https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
()=>{
    let maxProfit = function(prices) {
        let buy = -Infinity, sell = 0;
        for(let price of prices){
            buy = Math.max(buy, -price);
            sell = Math.max(sell, buy+price);
        }
        return sell;
    };
}

//https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/
()=>{
    let maxProfit = function(k, prices) {
        const days = prices.length;
        const buy = new Array(k+1).fill(-Infinity);
        const sell = new Array(k+1).fill(0);
    
        for(let i=0; i<days; i++){
            for(let j=1; j<=k; j++){
                buy[j]=Math.max(buy[j], sell[j-1]-prices[i]);
                sell[j]=Math.max(sell[j],buy[j]+prices[i]);
            }
        }
        return sell[k];
    };
}

//https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/
()=>{
    let maxProfit = function(prices) {
        const n = prices.length;
        if(n===0){return;}
        let buy= new Array(n).fill(0);
        let sell= new Array(n).fill(0);
        let s1= new Array(n).fill(0);
        let s2 = new Array(n).fill(0);
        /*
        buy[i]: after brought,
        s1[i]: ready to sell,
        sell[i]: after sell,
        s2[i]: cool down completed, ready to buy
        */
        s1[0]=buy[0]=-prices[0];
        sell[0] = s2[0]=0;
        for(let i = 1; i<n; i++){
            buy[i]=s2[i-1]-prices[i];
            s1[i]=Math.max(buy[i-1], s1[i-1]);
            sell[i]=Math.max(buy[i-1], s1[i-1])+prices[i]
            s2[i]=Math.max(s2[i-1], sell[i-1]);
        }
        return Math.max(sell[n-1], s2[n-1]);
    };
}

//https://leetcode.com/problems/house-robber-ii/
()=>{
    let rob = function(nums) {
        const n=nums.length;
        if(n===0){return 0;}
        if(n===1){return nums[0];}
        /*
        the solution is either rob house 0 to n-2, or 1 to n-1
        */
        return Math.max(robHelper(nums, 0, nums.length-2), robHelper(nums, 1, nums.length-1))
    };
    let robHelper=(nums, start, end)=>{
        if(start>end) return 0;
        let prev1=0; // max profit if robbed previous house;
        let prev2=0; // max profit if didn't rob the previous;
        for(let i = start; i<=end; i++){
            const current = Math.max(prev1, prev2+nums[i]);
            prev2=prev1;
            prev1=current;
        }
        return prev1;
    }
}

//https://leetcode.com/problems/maximum-subarray/
()=>{
    let maxSubArray = function(nums) {
        const n = nums.length;
        if (n === 1) {
            return nums[0];
        }
    
        // Initialize DP array to store maximum sum ending at each index
        const dp = new Array(n).fill(0);
        dp[0] = nums[0];
        let maxSum = dp[0];
    
        for (let i = 1; i < n; i++) {
            // Maximum sum ending at current position is either:
            // 1. The current number alone, or
            // 2. The current number + maximum sum ending at previous position
            dp[i] = Math.max(nums[i], dp[i-1] + nums[i]);
            
            // Update global maximum
            maxSum = Math.max(maxSum, dp[i]);
        }
    
        return maxSum;
    };
}

//https://leetcode.com/problems/integer-break/
()=>{
    const integerBreak = function(n) {
    if (n === 2) return 1;  // 1 * 1 = 1
    if (n === 3) return 2;  // 1 * 2 = 2
    
    const dp = new Array(n + 1).fill(0);
    dp[1] = 1;  // Base case
    dp[2] = 1;  // Manually set for n=2
    dp[3] = 2;  // Manually set for n=3
    
    for (let i = 4; i <= n; i++) {
        for (let j = 1; j < i; j++) {
            // Compare:
            // 1. j * (i-j) → Split into two parts
            // 2. j * dp[i-j] → Split i-j further
            dp[i] = Math.max(dp[i], j * (i - j), j * dp[i - j]);
        }
    }
    
    return dp[n];
};
}

//https://leetcode.com/problems/delete-operation-for-two-strings/
()=>{
    let minDistance = function(word1, word2) {
        const m=word1.length;
        const n=word2.length;
            const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
        for(let i=1; i<=m; i++){
            for(let j=1; j<=n; j++){
                if (word1[i - 1] === word2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        const lcsLength = dp[m][n];
        return (m - lcsLength) + (n - lcsLength);
    };
}