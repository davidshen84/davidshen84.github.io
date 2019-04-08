# Solr TermVectorComponent

[TermVectorComponent][1] is a **SearchComponent** designed to return information about documents that is stored when setting the *termVector* attribute on a field.

Options:

- tv.tf - Return document term frequency info per term in the document.
- tv.df - Return the Document Frequency (DF) of the term in the collection. This can be expensive.
- tv.positions - Return position information.
- tv.offsets - Return offset information for each term in the document.
- tv.tf_idf - Calculates tf*idf for each term. Requires the parameters tv.tf and tv.df to be "true". This can be expensive. (not shown in example output)
- tv.all - If true, turn on extra information (tv.tf, tv.df, etc)
- tv.fl - (Solr3.1) Provides the list of fields to get term vectors for (defaults to fl)
- tv.docIds - List of Lucene document ids (not the Solr Unique Key) to get term vectors for.


  [1]: https://wiki.apache.org/solr/TermVectorComponent