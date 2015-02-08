'use strict';

/*
This function is based on the following post:

  Chudov, G. S. (2010, November 20). Inefficient clz implementation. Retrieved May 1, 2014, from
  Intel Developer Zone: https://software.intel.com/en-us/forums/topic/286525#comment-1513252

The "Terms of Use" (http://www.intel.com/content/www/us/en/legal/terms-of-use.html) state:

  Definition: User content submissions may include but not limited to, may include user registration, participation, public sharing, posting, uploading, linking, downloading, and transferring, viewing, blogging, commenting, chat room, bulletin board and forum participation, or submitting or transmitting content, including, but not limited to graphics, art, software, code, data, text, video, audio, text, opinions, descriptions etc. (the "User Content") on any Intel Web Site. The content submitted by users is referred to here after as "User Content".
  
  ...

  License: Unless other specified on the Web Site or activity terms and conditions, by posting, displaying, uploading, inputting, providing or submitting such user content you grant Intel, necessary sub-licensees and Web Site users, a perpetual, irrevocable and fully sub-licensable license to use worldwide, royalty-free and non-exclusive license, to use, distribute, reproduce, modify, adapt, publish, translate, publicly perform and publicly display the User Content (in whole or in part) and to incorporate such User Content into other works in any format or medium now known or later developed for any and all commercial or non-commercial purposes.
  
  ...
*/

define(function () {
  /**
   * Gets the index of the first bit that is set to 1. If the argument is zero, the result is 32.
   * @param {Number} x - A 32-bit unsigned integer.
   * @return {Number} The index of the first bit that is set to 1.
   */
  function clz32(x) {
    function gn(x) {
      return x > 0 ? 1 : 0;
    }
    
    // jshint bitwise:false
    // convert to unsigned 32-bit integer
    var n = x >>> 0;
    
    var p = !!(n >>> 16) << 4;
    p += !!(n >>> (p + 8)) << 3;
    p += !!(n >>> (p + 4)) << 2;
    p += !!(n >>> (p + 2)) << 1;
    p += !!(n >>> (p + 1));
    p += !!(n >>> p);
    
    return 32 - p;
  }
  
  return clz32;
});