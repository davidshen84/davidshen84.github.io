# How to set up Gradle Android Unit Testing Plugin and Robolectric


Assuming you are using **Android Studio** v0.4.0, and what to run you unit test with [**Robolectric**][2].

This guide will help set up the [**Gradle Android Unit Testing Plugin**][1]. I know there's a *Usage* section on the site. But if you try, it won't work.

Below changes all apply to the *build.gradle* file.


- The `buildscript` section

The lines prefixed with `>` are which you should insert or replace in you file.

    buildscript {
        repositories {
            mavenCentral()
    >       maven {
    >           url 'https://oss.sonatype.org/content/repositories/snapshots/'
    >       }
        }
        dependencies {
            classpath 'com.android.tools.build:gradle:0.7.+'
    >       classpath 'com.squareup.gradle:gradle-android-test-plugin:0.9.1-SNAPSHOT'
        }
    }

*Note, for the `classpath`, it has to be the exact value.*

- Below the `buildscript` section, you should find some lines start with `apply`. Append this line.


    apply plugin: 'android-test'

- Go down to the `android` section and insert this at the end of this section:


    sourceSets {
        instrumentTest.setRoot('src/test')
    }

*Note, this changes your project structure. Because with Robolectric, the tests are no longer considered instrument test, so I think this change is appropriate.*

- Finally, append this block to the end of `dependencies` section.


    testCompile 'junit:junit:4.+'
    testCompile 'org.robolectric:robolectric:2.1.+'
    testCompile 'com.squareup:fest-android:1.0.+'

    instrumentTestCompile 'junit:junit:4.+'
    instrumentTestCompile 'org.robolectric:robolectric:2.1.+'
    instrumentTestCompile 'com.squareup:fest-android:1.0.+'

I found this from other places. I don't know why we need to repeat these dependencies.

Then, you can follow the project's home page to set up your tests.


  [1]: https://github.com/JakeWharton/gradle-android-test-plugin
  [2]: http://robolectric.org/