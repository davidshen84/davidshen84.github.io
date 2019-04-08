# ivy default setting

原来ivy的这段默认设置是会被覆盖掉的啊。。。尼玛早说啊，害我研究了2天~~~

*ivysettings.xml*

    <ivysettings>
      <settings defaultResolver="default"/>
      <include url="${ivy.default.settings.dir}/ivysettings-public.xml"/>
      <include url="${ivy.default.settings.dir}/ivysettings-shared.xml"/>
      <include url="${ivy.default.settings.dir}/ivysettings-local.xml"/>
      <include url="${ivy.default.settings.dir}/ivysettings-main-chain.xml"/>
      <include url="${ivy.default.settings.dir}/ivysettings-default-chain.xml"/>
      ...
    </ivysettings>
这些设置定义了ivy的默认行为。包括怎么解析本地的包。自己写*ivysettings.xml*的时候，一定记得加上。