# comporjs
A simple library for creating html with javascript keeping the visual similarity 
with the generated code.

## usage

### template
The lib exposes two functions, e() and block(), those functions are used in a nested way 
to replicate the html that will be generated;

So first you should use the block function to start, well, a block. Then, nesting the e()
function call, you will be able to build the block structure.

```javascript
let template = block( e => 
    e('div.container-fluid',
          e('div.row',
              e('div.col-md-12',
                  e('div#main-image',
                      e('img.image').attr('src', './img/logo.jpg'),
                  ),
                  e('h1.title').text('Title'),
                  e('small.subtitle').text('Subtitle'),
              )
          ),
          e('div.row',
              e('div.col-md-12',
                  e('button.btn.btn-primary.btn-lg.btn-block','btnFacebook').text('Login com Facebook'),
                  e('button.btn.btn-primary.btn-lg.btn-block','btnGoogle').text('Login com Google')
              )
          )
      )
    );
```

### references
If you need to access any tag, you can use the ref() function of a block. The identifier of a reference
is a string, second parameter of the e() call. Like 'btnFacebook' in the code above and bellow.

This will return to you the wrapper that envolves the plain DOM node. To get the node
itseft you should use the ".el" property (I'm still thinking in a better way...)

```javascript
    template.ref('btnFacebook').el.addEventListener('click', this.loginFacebook.bind(this));
```

### notes
The intent of this repo is to present the idea, fell free to comment and help me with the 
formulation of a "production ready" version. Thanks :)

Last but not least, this repo is inspired by the "create element" method developed by https://github.com/marxluz.
Teammate and outstanding programmer.
