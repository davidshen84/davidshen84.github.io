# Solr DataSource Parameters

按照[wiki](https://wiki.apache.org/solr/DataImportHandler#Accessing_request_parameters)上说的，所有的参数都可以通过**${dataimporter.request.\*}**获取。

假设配置如下：

    <dataConfig>
      <dataSource type="org.shen.solr.MyMockDataSource" />
      <document>
        <entity name="test" query="${dataimporter.request.command}">
          <field column="id" name="id"/>
          <field column="text" name="text"/>
        </entity>
      </document>
    </dataConfig>

*DataSource.getData*方法的*query*参数在调用时，会被赋予*${dataimporter.request.command}*的值。其他可能的变量名包括：

- command
- verbose
- entity
- start
- rows
- clean
- optimize
- 自定义的参数将会以key=value的形式逐个列出