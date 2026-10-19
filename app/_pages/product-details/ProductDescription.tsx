/**
 * Wraps numbers (digits, percentages, decimals) in the HTML string with a span
 * that has roboto-num class to force Roboto font rendering.
 * Only wraps numbers in text content, not in HTML tags or attributes.
 */
const wrapNumbersWithSpan = (html: string): string => {
  let result = "";
  let insideTag = false;
  let i = 0;

  while (i < html.length) {
    const char = html[i];

    // Track if we're inside an HTML tag
    if (char === "<") {
      insideTag = true;
      result += char;
      i++;
      continue;
    }

    if (char === ">") {
      insideTag = false;
      result += char;
      i++;
      continue;
    }

    // If we're inside a tag, just copy the character
    if (insideTag) {
      result += char;
      i++;
      continue;
    }

    // Outside tags: check if this is the start of a number
    if (/\d/.test(char)) {
      // Extract the full number (including decimals, commas, percentage)
      let number = "";
      let j = i;

      // Capture: digits, optional decimal/comma, optional percentage, optional trailing space before %
      while (
        j < html.length &&
        /[\d.,\s%]/.test(html[j]) &&
        (html[j] !== " " || (j + 1 < html.length && html[j + 1] === "%"))
      ) {
        number += html[j];
        j++;

        // Stop after capturing percentage
        if (html[j - 1] === "%") break;
      }

      // Trim any trailing spaces (except before %)
      number = number.trimEnd();
      if (
        number &&
        html[j - 1] !== "%" &&
        /\s/.test(number[number.length - 1])
      ) {
        number = number.trimEnd();
        j = i + number.length;
      }

      // Wrap the number in a span
      result += `<span class="roboto-num">${number}</span>`;
      // result += `<span className="!font-roboto text-blue-600">${number}</span>`;
      i = j;
    } else {
      result += char;
      i++;
    }
  }

  return result;
};

const ProductDescription = ({ description }: { description: string }) => {
  const processedDescription = wrapNumbersWithSpan(description);

  // console.log("processed description = ", processedDescription);
  return (
    <div
      className="product-description mt-5"
      dangerouslySetInnerHTML={{ __html: processedDescription }}
    />
  );
};

export default ProductDescription;
