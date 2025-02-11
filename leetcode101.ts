// self learning, using javascript to solve leetcode_101 chanllenges
// reference: https://github.com/changgyhub/leetcode_101/

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