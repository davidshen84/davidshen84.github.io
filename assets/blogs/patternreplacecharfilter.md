# PatternReplaceCharFilter

CharFilter should be used before Tokenizer. It filter the characters in the input stream. Its that simple :) For this `PatternReplaceCharFilter`, it filter the characters by the *RegExp*.

Options:

- pattern (required) – the value to be changed (regular expressions)
- replacement (default: “”) – the value that will be used as a replament for the fragment that matched the regular expression
- blockDelimiters
- maxBlockChars (default: 10000, must be greater than 0) – buffer used for comparison

Example:

    <fieldType name="textCharNorm" class="solr.TextField">
      <analyzer>
        <charFilter class="solr.PatternReplaceCharFilterFactory"
          pattern=",|."
          replacement=" " />
        <tokenizer class="solr.WhitespaceTokenizerFactory"/>
      </analyzer>
    </fieldType>