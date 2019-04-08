# How to use FilteringTokenFilter

- What is FilteringTokenFilter?

[`org.apache.lucene.analysis.util.FilteringTokenFilter`][1] is the base class for any filtering related token filters, e.g. the *StopFilter* and *TypeTokenFilter*. The key purpose of this filter is to remove a *token* from the *TokenStream*.

- Override the *accept()* method

The *FilteringTokenFilter* class is abstract, and you have to implement the *accept()* method and return **true** if the token should be preserved. This method will be used by *incrementToken()* method to decide if a token should be passed to the caller.

- What is *enablePositionIncrements*?


  [1]: https://lucene.apache.org/core/4_0_0/analyzers-common/org/apache/lucene/analysis/util/FilteringTokenFilter.html