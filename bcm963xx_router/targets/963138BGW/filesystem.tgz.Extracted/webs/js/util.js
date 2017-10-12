function isHexaDigit(digit) {
   var hexVals = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
                           "A", "B", "C", "D", "E", "F", "a", "b", "c", "d", "e", "f");
   var len = hexVals.length;
   var i = 0;
   var ret = false;

   for ( i = 0; i < len; i++ )
      if ( digit == hexVals[i] ) break;

   if ( i < len )
      ret = true;

   return ret;
}

function isValidKey(val, size) {
   var ret = false;
   var len = val.length;
   var dbSize = size * 2;

   if ( len == size )
      ret = true;
   else if ( len == dbSize ) {
      for ( i = 0; i < dbSize; i++ )
         if ( isHexaDigit(val.charAt(i)) == false )
            break;
      if ( i == dbSize )
         ret = true;
   } else
      ret = false;

   return ret;
}


 function isValidSSID(ssidUT) {
       var ssid = ssidUT;
       var vssid = ssid.value;
       //things that are allowed
       var rege=/[^a-zA-Z0-9\_\!\@\#\$\%\^\&\*\(\)\-\=\+\~\`\,\.\?\|\[\]\{\}\"\;\:\,\<\>\\\/\']/;
       var maxlen = 32;
       var n_ssid="";

       if (vssid == "") {
           alert("The SSID must not be null.");
           return false;
       }

       n_ssid = vssid.match(rege);
       if (n_ssid) {
               ssid.value = vssid.substring(0, vssid.indexOf(n_ssid) );
               alert( "SSID must not contains spaces." );
               return false;
       }
       if (vssid.length > maxlen) {
           alert("The max length of SSID is" + maxlen + " .");
           ssid.value = vssid.substring(0, maxlen);
       }

       return true;
   }

function isValidHexKey(val, size) {
   var ret = false;
   if (val.length == size) {
      for ( i = 0; i < val.length; i++ ) {
         if ( isHexaDigit(val.charAt(i)) == false ) {
            break;
         }
      }
      if ( i == val.length ) {
         ret = true;
      }
   }

   return ret;
}


function isNameUnsafe(compareChar) {
   var unsafeString = "\"<>%\\^[]`\+\$\,='#&@.: \t";

   if ( unsafeString.indexOf(compareChar) == -1 && compareChar.charCodeAt(0) > 32
        && compareChar.charCodeAt(0) < 123 )
      return false; // found no unsafe chars, return false
   else
      return true;
}

// Check if a name valid
function isValidName(name) {
   var i = 0;

   for ( i = 0; i < name.length; i++ ) {
      if ( isNameUnsafe(name.charAt(i)) == true )
         return false;
   }

   return true;
}

// same as is isNameUnsafe but allow spaces
function isCharUnsafe(compareChar) {
   var unsafeString = "\"<>%\\^[]`\+\$\,='#&@.:\t";

   if ( unsafeString.indexOf(compareChar) == -1 && compareChar.charCodeAt(0) >= 32
        && compareChar.charCodeAt(0) < 123 )
      return false; // found no unsafe chars, return false
   else
      return true;
}

function isValidNameWSpace(name) {
   var i = 0;

   for ( i = 0; i < name.length; i++ ) {
      if ( isCharUnsafe(name.charAt(i)) == true )
         return false;
   }

   return true;
}

// The alias must be alphanumeric
function isAliasUnsafe(aliasChar) {
   var unsafeString = ":;<=>?@[\\]^_`";

   if ( unsafeString.indexOf(aliasChar) == -1 &&
        aliasChar.charCodeAt(0) >= 48 &&
        aliasChar.charCodeAt(0) < 123 )
     return false; //found no unsafe chars, return false
   if (aliasChar == ' ')
       return false;
   return true;
}

function  isValidAlias(alias) {
   var i = 0;

   for ( i = 0; i < alias.length; i++ ) {
      if ( isAliasUnsafe(alias.charAt(i)) == true )
         return false;
   }

   return true;
}

function isSameSubNet(lan1Ip, lan1Mask, lan2Ip, lan2Mask) {

   var count = 0;

   lan1a = lan1Ip.split('.');
   lan1m = lan1Mask.split('.');
   lan2a = lan2Ip.split('.');
   lan2m = lan2Mask.split('.');

   for (i = 0; i < 4; i++) {
      l1a_n = parseInt(lan1a[i]);
      l1m_n = parseInt(lan1m[i]);
      l2a_n = parseInt(lan2a[i]);
      l2m_n = parseInt(lan2m[i]);
      if ((l1a_n & l1m_n) == (l2a_n & l2m_n))
         count++;
   }
   if (count == 4)
      return true;
   else
      return false;
}


function isValidIpAddress(address) {
   var i = 0;
   var ipPattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
   var ipArray = address.match(ipPattern);

   if (ipArray == null)
      return false;


   if ( address == '0.0.0.0' ||
        address == '255.255.255.255' )
      return false;

   addrParts = address.split('.');
   if ( addrParts.length != 4 ) return false;
   for (i = 0; i < 4; i++) {
      if (isNaN(addrParts[i]) || addrParts[i] =="")
         return false;
      num = parseInt(addrParts[i]);
      if ( num < 0 || num > 255 )
         return false;
   }
   return true;
}

function isValidIpAddress6(address) {
   var i = 0, num = 0;

   addrParts = address.split(':');
   if (addrParts.length < 3 || addrParts.length > 8)
      return false;
   for (i = 0; i < addrParts.length; i++) {
      if ( addrParts[i] != "" )
         num = parseInt(addrParts[i], 16);
      if ( i == 0 ) {
//         if ( (num & 0xf000) == 0xf000 )
//            return false;	//can not be link-local, site-local or multicast address
      }
      else if ( (i + 1) == addrParts.length) {
         if ( num == 0 || num == 1)
            return false;	//can not be unspecified or loopback address
      }
      if ( num != 0 )
         break;
   }
   return true;
}

function isValidPrefixLength(prefixLen) {
   var num;

   num = parseInt(prefixLen);
   if (num <= 0 || num > 128)
      return false;
   return true;
}

function areSamePrefix(addr1, addr2) {
   var i, j;
   var a = [0, 0, 0, 0, 0, 0, 0, 0];
   var b = [0, 0, 0, 0, 0, 0, 0, 0];

   addr1Parts = addr1.split(':');
   if (addr1Parts.length < 3 || addr1Parts.length > 8)
      return false;
   addr2Parts = addr2.split(':');
   if (addr2Parts.length < 3 || addr2Parts.length > 8)
      return false;
   j = 0;
   for (i = 0; i < addr1Parts.length; i++) {
      if ( addr1Parts[i] == "" ) {
		 if ((i != 0) && (i+1 != addr1Parts.length)) {
			j = j + (8 - addr1Parts.length + 1);
		 }
		 else {
		    j++;
		 }
	  }
	  else {
         a[j] = parseInt(addr1Parts[i], 16);
		 j++;
	  }
   }
   j = 0;
   for (i = 0; i < addr2Parts.length; i++) {
      if ( addr2Parts[i] == "" ) {
		 if ((i != 0) && (i+1 != addr2Parts.length)) {
			j = j + (8 - addr2Parts.length + 1);
		 }
		 else {
		    j++;
		 }
	  }
	  else {
         b[j] = parseInt(addr2Parts[i], 16);
		 j++;
	  }
   }
   //only compare 64 bit prefix
   for (i = 0; i < 4; i++) {
      if (a[i] != b[i]) {
	     return false;
	  }
   }
   return true;
}

function getLeftMostZeroBitPos(num) {
   var i = 0;
   var numArr = [128, 64, 32, 16, 8, 4, 2, 1];

   for ( i = 0; i < numArr.length; i++ )
      if ( (num & numArr[i]) == 0 )
         return i;

   return numArr.length;
}

function getRightMostOneBitPos(num) {
   var i = 0;
   var numArr = [1, 2, 4, 8, 16, 32, 64, 128];

   for ( i = 0; i < numArr.length; i++ )
      if ( ((num & numArr[i]) >> i) == 1 )
         return (numArr.length - i - 1);

   return -1;
}

function isValidSubnetMask(mask) {
   var i = 0, num = 0;
   var zeroBitPos = 0, oneBitPos = 0;
   var zeroBitExisted = false;

   if ( mask == '0.0.0.0' )
      return false;

   maskParts = mask.split('.');
   if ( maskParts.length != 4 ) return false;

   for (i = 0; i < 4; i++) {
      if ( isNaN(maskParts[i]) == true )
         return false;
      num = parseInt(maskParts[i]);
      if ( num < 0 || num > 255 )
         return false;
      if ( zeroBitExisted == true && num != 0 )
         return false;
      zeroBitPos = getLeftMostZeroBitPos(num);
      oneBitPos = getRightMostOneBitPos(num);
      if ( zeroBitPos < oneBitPos )
         return false;
      if ( zeroBitPos < 8 )
         zeroBitExisted = true;
   }

   return true;
}

function isValidPort(port) {
   var fromport = 0;
   var toport = 100;

   portrange = port.split(':');
   if ( portrange.length < 1 || portrange.length > 2 ) {
       return false;
   }
   if ( isNaN(portrange[0]) )
       return false;
   fromport = parseInt(portrange[0]);
   if ( isNaN(fromport) )
       return false;

   if ( portrange.length > 1 ) {
       if ( isNaN(portrange[1]) )
          return false;
       toport = parseInt(portrange[1]);
       if ( isNaN(toport) )
           return false;
       if ( toport <= fromport )
           return false;
   }

   if ( fromport < 1 || fromport > 65535 || toport < 1 || toport > 65535 )
       return false;

   return true;
}

function isValidNatPort(port) {
   var fromport = 0;
   var toport = 100;

   portrange = port.split('-');
   if ( portrange.length < 1 || portrange.length > 2 ) {
       return false;
   }
   if ( isNaN(portrange[0]) )
       return false;
   fromport = parseInt(portrange[0]);

   if ( portrange.length > 1 ) {
       if ( isNaN(portrange[1]) )
          return false;
       toport = parseInt(portrange[1]);
       if ( toport <= fromport )
           return false;
   }

   if ( fromport < 1 || fromport > 65535 || toport < 1 || toport > 65535 )
       return false;

   return true;
}

function isValidMacAddress(address) {
   var c = '';
   var num = 0;
   var i = 0, j = 0;
   var zeros = 0;

   addrParts = address.split(':');
   if ( addrParts.length != 6 ) return false;

   for (i = 0; i < 6; i++) {
      if ( addrParts[i] == '' )
         return false;
      for ( j = 0; j < addrParts[i].length; j++ ) {
         c = addrParts[i].toLowerCase().charAt(j);
         if ( (c >= '0' && c <= '9') ||
              (c >= 'a' && c <= 'f') )
            continue;
         else
            return false;
      }

      num = parseInt(addrParts[i], 16);
      if ( num == NaN || num < 0 || num > 255 )
         return false;
      if ( num == 0 )
         zeros++;
   }
   if (zeros == 6)
      return false;

   return true;
}

function isValidMacMask(mask) {
   var c = '';
   var num = 0;
   var i = 0, j = 0;
   var zeros = 0;
   var zeroBitPos = 0, oneBitPos = 0;
   var zeroBitExisted = false;

   maskParts = mask.split(':');
   if ( maskParts.length != 6 ) return false;

   for (i = 0; i < 6; i++) {
      if ( maskParts[i] == '' )
         return false;
      for ( j = 0; j < maskParts[i].length; j++ ) {
         c = maskParts[i].toLowerCase().charAt(j);
         if ( (c >= '0' && c <= '9') ||
              (c >= 'a' && c <= 'f') )
            continue;
         else
            return false;
      }

      num = parseInt(maskParts[i], 16);
      if ( num == NaN || num < 0 || num > 255 )
         return false;
      if ( zeroBitExisted == true && num != 0 )
         return false;
      if ( num == 0 )
         zeros++;
      zeroBitPos = getLeftMostZeroBitPos(num);
      oneBitPos = getRightMostOneBitPos(num);
      if ( zeroBitPos < oneBitPos )
         return false;
      if ( zeroBitPos < 8 )
         zeroBitExisted = true;
   }
   if (zeros == 6)
      return false;

   return true;
}

var hexVals = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
              "A", "B", "C", "D", "E", "F");
var unsafeString = "\"<>%\\^[]`\+\$\,'#&";
// deleted these chars from the include list ";", "/", "?", ":", "@", "=", "&" and #
// so that we could analyze actual URLs

function isUnsafe(compareChar)
// this function checks to see if a char is URL unsafe.
// Returns bool result. True = unsafe, False = safe
{
   if ( unsafeString.indexOf(compareChar) == -1 && compareChar.charCodeAt(0) > 32
        && compareChar.charCodeAt(0) < 123 )
      return false; // found no unsafe chars, return false
   else
      return true;
}

function newIsUnsafe(compareChar)
// this function checks to see if a char is URL unsafe.
// Returns bool result. True = unsafe, False = safe
{
   if ( unsafeString.indexOf(compareChar) == -1 && ((compareChar.charCodeAt(0) > 47
        && compareChar.charCodeAt(0) < 58) ||(compareChar.charCodeAt(0) > 64
        && compareChar.charCodeAt(0) < 91)||(compareChar.charCodeAt(0) > 96
        && compareChar.charCodeAt(0) < 123)) )
      return false; // found no unsafe chars, return false
   else
      return true;
}

function decToHex(num, radix)
// part of the hex-ifying functionality
{
   var hexString = "";
   while ( num >= radix ) {
      temp = num % radix;
      num = Math.floor(num / radix);
      hexString += hexVals[temp];
   }
   hexString += hexVals[num];
   return reversal(hexString);
}

function reversal(s)
// part of the hex-ifying functionality
{
   var len = s.length;
   var trans = "";
   for (i = 0; i < len; i++)
      trans = trans + s.substring(len-i-1, len-i);
   s = trans;
   return s;
}

function convert(val)
// this converts a given char to url hex form
{
   if(val=="&"){
      return  "%" + decToHex(val.charCodeAt(0), 16)+"0.6117115231341502";
   }else{
      return val;
   }
}

function newEncodeUrl(val)
{
   var len     = val.length;
   var i       = 0;
   var newStr  = "";
   var original = val;

   for ( i = 0; i < len; i++ ) {
      if ( val.substring(i,i+1).charCodeAt(0) < 255 ) {
         // hack to eliminate the rest of unicode from this
         if (newIsUnsafe(val.substring(i,i+1)) == false)
            newStr = newStr + val.substring(i,i+1);
         else
            newStr = newStr + convert(val.substring(i,i+1));
      } else {
         // woopsie! restore.
         alert ("Found a non-ISO-8859-1 character at position: " + (i+1) + ",\nPlease eliminate before continuing.");
         newStr = original;
         // short-circuit the loop and exit
         i = len;
      }
   }

   return newStr;
}


function encodeUrl(val)
{
   var len     = val.length;
   var i       = 0;
   var newStr  = "";
   var original = val;

   for ( i = 0; i < len; i++ ) {
      if ( val.substring(i,i+1).charCodeAt(0) < 255 ) {
         // hack to eliminate the rest of unicode from this
         if (isUnsafe(val.substring(i,i+1)) == false)
            newStr = newStr + val.substring(i,i+1);
         else
            newStr = newStr + convert(val.substring(i,i+1));
      } else {
         // woopsie! restore.
         alert ("Found a non-ISO-8859-1 character at position: " + (i+1) + ",\nPlease eliminate before continuing.");
         newStr = original;
         // short-circuit the loop and exit
         i = len;
      }
   }

   return newStr;
}

function decodeUrl(val)
{
    var len=val.length;
    var i=0;
    var j=0;
    var newStr="";
    var temp1="";
    var temp2="";
    var temp="";
    var c1='';
    var c2='';
    var newcode=0;
    for(i=0;i<len;)
    {
        temp=val.substring(i,i+1);
        if(temp== "%")
        {
            temp1=val.substring(i+1,i+2);
            c1=temp1.toLowerCase().charAt(0);
            temp2=val.substring(i+2,i+3);
            c2=temp2.toLowerCase().charAt(0);
            if(((c1 >= '0' && c1 <= '9') ||
              (c1 >= 'a' && c1 <= 'f') ) &&((c2 >= '0' && c2 <= '9') ||
              (c2 >= 'a' && c2 <= 'f')))
            {

                temp=temp1;
                temp+=temp2;
                newcode=parseInt(temp,16);
                temp=String.fromCharCode(newcode);
                newStr+=temp;
                i+=3;
            }
            else
            {
               newStr+=temp;
               i++;
            }
        }
        else
        {
            newStr+=temp;
            i++;
        }
    }
    return newStr;
}

var markStrChars = "\"'";

// Checks to see if a char is used to mark begining and ending of string.
// Returns bool result. True = special, False = not special
function isMarkStrChar(compareChar)
{
   if ( markStrChars.indexOf(compareChar) == -1 )
      return false; // found no marked string chars, return false
   else
      return true;
}

// use backslash in front one of the escape codes to process
// marked string characters.
// Returns new process string
function processMarkStrChars(str) {
   var i = 0;
   var retStr = '';

   for ( i = 0; i < str.length; i++ ) {
      if ( isMarkStrChar(str.charAt(i)) == true )
         retStr += '\\';
      retStr += str.charAt(i);
   }

   return retStr;
}

// Web page manipulation functions

function showhide(element, sh)
{
    var status;
    if (sh == 1) {
        status = "block";
    }
    else {
        status = "none"
    }

	if (document.getElementById)
	{
		// standard
		document.getElementById(element).style.display = status;
	}
	else if (document.all)
	{
		// old IE
		document.all[element].style.display = status;
	}
	else if (document.layers)
	{
		// Netscape 4
		document.layers[element].display = status;
	}
}

// Load / submit functions

function getSelect(item)
{
	var idx;
	if (item.options.length > 0) {
	    idx = item.selectedIndex;
	    return item.options[idx].value;
	}
	else {
		return '';
    }
}

function setSelect(item, value)
{
	for (i=0; i<item.options.length; i++) {
        if (item.options[i].value == value) {
		item.selectedIndex = i;
		break;
        }
    }
}

function setCheck(item, value)
{
    if ( value == '1' ) {
         item.checked = true;
    } else {
         item.checked = false;
    }
}

function setDisable(item, value)
{
    if ( value == 1 || value == '1' ) {
         item.disabled = true;
    } else {
         item.disabled = false;
    }
}

function submitText(item)
{
	return '&' + item.name + '=' + item.value;
}

function submitSelect(item)
{
	return '&' + item.name + '=' + getSelect(item);
}


function submitCheck(item)
{
	var val;
	if (item.checked == true) {
		val = 1;
	}
	else {
		val = 0;
	}
	return '&' + item.name + '=' + val;
}

/*
 *  Input   addr:       addr is a string, which is net address such as '192.168.10.5'
 *          bit_val:    bit_val is an array
 *                      length is 32
 *                      countains the binary NetMask
 */
function changeNetAddrIntoBit(addr, bit_val)
{
    var val = addr.split('.');
    var count = 0;
    for (j = 0; j < 4; j++)
    {
        var bit8_val = parseInt(val[3-j]);
        for (i = 0; i < 8; i ++)
        {
            bit_val[31-count] = bit8_val%2;
            if (bit_val[31-count] == 0)
                bit8_val = bit8_val/2;
            else
                bit8_val = (bit8_val -1)/2;
            count++;
        }
    }
}

/*
 *  Input:  Mask_bit   Mask_bit is an array
 *                     length is 32
 *                     countains the binary NetMask
 */
function getMaskBitOneNum(Mask_bit)
{
    for (i = 0; i<32; i++)
    {
        if ( Mask_bit[i] == 0)
            return i;
    }
    return 32;
}

/*
 *  Return: 1       lan1 is a subnet of lan2
 *          0       lan1 is the same as lan2
 *          -1      lan2 is a subnet of lan1
 *          100    lan1 and lan2 don't have any relationship
 *
 */
function compareSubNet(lan1Ip, lan1Mask, lan2Ip, lan2Mask)
{
    var lan1Ip_bit = new Array();
    var lan1Mask_bit = new Array();
    var lan2Ip_bit = new Array();
    var lan2Mask_bit = new Array();
    changeNetAddrIntoBit(lan1Ip, lan1Ip_bit);
    changeNetAddrIntoBit(lan1Mask, lan1Mask_bit);
    changeNetAddrIntoBit(lan2Ip, lan2Ip_bit);
    changeNetAddrIntoBit(lan2Mask, lan2Mask_bit);
    var lan1_Mask_len = getMaskBitOneNum(lan1Mask_bit);
    var lan2_Mask_len = getMaskBitOneNum(lan2Mask_bit);
    if (lan1_Mask_len < lan2_Mask_len)
    {
        for (i = 0; i<lan1_Mask_len; i++)
        {
            if (lan1Ip_bit[i] != lan2Ip_bit[i])
                return 100;
        }
        return -1;
    }
    else if(lan1_Mask_len > lan2_Mask_len)
    {
        for (i = 0; i<lan2_Mask_len; i++)
        {
            if (lan1Ip_bit[i] != lan2Ip_bit[i])
                return 100;
        }
        return 1;
    }
    else
    {
        for (i = 0; i<lan1_Mask_len; i++)
        {
            if (lan1Ip_bit[i] != lan2Ip_bit[i])
                return 100;
        }
        return 0;

    }
}

/*
 *  Input   IpAddr: ip's address such as "192.168.0.1"
 *  Return  1:  the ip is in the range: 0~127.255.255.255
 *          2:  the ip is in the range: 128~192.255.255.255
 *          3:  the ip is in the range: 193~238.255.255.255
 *          4:  the ip is in the range: 225~240.255.255.255  muticast ip Address
 *          5:  the ip is in the range: 240~255.255.255.255  broadcast ip Address
 */
function checkIPType(IpAddr)
{
    var val = IpAddr.split('.');
    var byte1_val = parseInt(val[0]);
    if (byte1_val < 128)
        return 1;
    else if (byte1_val < 192)
        return 2;
    else if (byte1_val < 224)
        return 3;
    else if (byte1_val < 240)
        return 4;
    else
        return 5;
}

function encrypt_query(instr,key)
{
    return instr;
}

function checkDomain(domname)
{
	var arr = new Array(
	'.com','.net','.org','.biz','.coop','.info','.museum','.name',
	'.pro','.edu','.gov','.int','.mil','.ac','.ad','.ae','.af','.ag',
	'.ai','.al','.am','.an','.ao','.aq','.ar','.as','.at','.au','.aw',
	'.az','.ba','.bb','.bd','.be','.bf','.bg','.bh','.bi','.bj','.bm',
	'.bn','.bo','.br','.bs','.bt','.bv','.bw','.by','.bz','.ca','.cc',
	'.cd','.cf','.cg','.ch','.ci','.ck','.cl','.cm','.cn','.co','.cr',
	'.cu','.cv','.cx','.cy','.cz','.de','.dj','.dk','.dm','.do','.dz',
	'.ec','.ee','.eg','.eh','.er','.es','.et','.fi','.fj','.fk','.fm',
	'.fo','.fr','.ga','.gd','.ge','.gf','.gg','.gh','.gi','.gl','.gm',
	'.gn','.gp','.gq','.gr','.gs','.gt','.gu','.gv','.gy','.hk','.hm',
	'.hn','.hr','.ht','.hu','.id','.ie','.il','.im','.in','.io','.iq',
	'.ir','.is','.it','.je','.jm','.jo','.jp','.ke','.kg','.kh','.ki',
	'.km','.kn','.kp','.kr','.kw','.ky','.kz','.la','.lb','.lc','.li',
	'.lk','.lr','.ls','.lt','.lu','.lv','.ly','.ma','.mc','.md','.mg',
	'.mh','.mk','.ml','.mm','.mn','.mo','.mp','.mq','.mr','.ms','.mt',
	'.mu','.mv','.mw','.mx','.my','.mz','.na','.nc','.ne','.nf','.ng',
	'.ni','.nl','.no','.np','.nr','.nu','.nz','.om','.pa','.pe','.pf',
	'.pg','.ph','.pk','.pl','.pm','.pn','.pr','.ps','.pt','.pw','.py',
	'.qa','.re','.ro','.rw','.ru','.sa','.sb','.sc','.sd','.se','.sg',
	'.sh','.si','.sj','.sk','.sl','.sm','.sn','.so','.sr','.st','.sv',
	'.sy','.sz','.tc','.td','.tf','.tg','.th','.tj','.tk','.tm','.tn',
	'.to','.tp','.tr','.tt','.tv','.tw','.tz','.ua','.ug','.uk','.um',
	'.us','.uy','.uz','.va','.vc','.ve','.vg','.vi','.vn','.vu','.ws',
	'.wf','.ye','.yt','.yu','.za','.zm','.zw');

	var domain = domname;
	var tag = true;
	var dot = domain.lastIndexOf(".");
	var dname = domain.substring(0,dot);
	var ext = domain.substring(dot,domain.length);

	if(dot>2 && dot<57)
	{
		for(var i=0; i<arr.length; i++)
		{
			if(ext == arr[i])
			{
				tag = true;
				break;
			}
			else
			{
				tag = false;
			}
		}
		if(tag == false)
		{
			return false;
		}
		else
		{
			for(var j=0; j<dname.length; j++)
			{
			var dh = dname.charAt(j);
			var hh = dh.charCodeAt(0);

			if((hh > 47 && hh<59) || (hh > 64 && hh<91) || (hh > 96 && hh<123) || hh==45 || hh==46)
			{
				if((j==0 || j==dname.length-1) && hh == 45)
				{
					return false;
					}
			}
				else
				{
					return false;
			}
			}
		}
	}
	else
	{
		return false;
	}
	return true;
}


/*
 *  Return: 0    ethSubnetMask is the same as dhcpSubnetMask
 *          1,-1,100    ethSubnetMask is not matched with dhcpSubnetMask
 *
 */
function compare_SubNet_New(lan1Mask, lan2Mask)
{
    var lan1Mask_bit = new Array();
    var lan2Mask_bit = new Array();
    changeNetAddrIntoBit(lan1Mask, lan1Mask_bit);
    changeNetAddrIntoBit(lan2Mask, lan2Mask_bit);
    var lan1_Mask_len = getMaskBitOneNum(lan1Mask_bit);
    var lan2_Mask_len = getMaskBitOneNum(lan2Mask_bit);
    if (lan1_Mask_len < lan2_Mask_len)
    {
        for (i = 0; i<lan2_Mask_len; i++)
        {
            if (lan1Mask[i] != lan2Mask[i])
                return 100;
        }
        return -1;
    }
    else if(lan1_Mask_len > lan2_Mask_len)
    {
        for (i = 0; i<lan1_Mask_len; i++)
        {
            if (lan1Mask[i] != lan2Mask[i])
                return 100;
        }
        return 1;
    }
    else
    {
        return 0;
    }
}
// Removes leading whitespaces
function LTrim( value ) {
  var re = /\s*((\S+\s*)*)/;
  return value.replace(re, "$1");
}
// Removes ending whitespaces
function RTrim( value ) {
  var re = /((\s*\S+)*)\s*/;
  return value.replace(re, "$1");
}

// Removes leading and ending whitespaces
function trim( value ) {
  return LTrim(RTrim(value));
}

function isNumber(str)
{
  var re = /^[0-9]*$/;
  var flag = true;
  if(!re.test(str)) {
    flag = false;
  }
  return flag;
}

