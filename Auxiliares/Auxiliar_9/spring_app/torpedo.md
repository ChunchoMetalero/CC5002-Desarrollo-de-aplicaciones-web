# Torpedo Spring Auxiliar 11

**Bean:** En el contexto de Spring Boot, un bean es un objeto que Spring instancia, ensambla y gestiona. Los beans se crean con los metadatos de configuración que proporciona el desarrollador.

**@Autowired:** Anotacion que delega a Spring la instanciacion de una dependencia (un objeto de una clase X) que se necesita en una clase Y.

**Arquitectura N-Tier:** 
Dividir el procesamiento en N etapas. El trabajo de cada etapa lo realiza una clase especifica. En este caso usaremos una arquitectura 3-Tier:

Request cliente -> Controller layer -> Service layer ->  Database layer

Response servidor <- Controller layer <- Service layer <- Database layer

**Thymeleaf:** engine de templates de Spring Boot. Se basa en definir "fragmentos" para luego reutilizarlos. 

Supone que en la carpeta `static` tienes una carpeta `fragments` y un archivo `index.html`. En `fragments` se encuentran todos tus fragmentos, en particular `ejemplo.html`. 

**Como definir un fragmento:** 
```html
<!-- ejemplo.html -->
<div th:fragment="ex-frag">
    <p>HOLA SOY UN FRAGMENTO XD</p>
</div>
```

**Como incluir un fragmento:**
```html
<!-- index.html -->
<!-- codigo HTML del index [...] -->
<div th:replace="~{fragments/ejemplo :: ex-frag}"></div>
<!-- codigo HTML del index [...] -->
```

**Como definir un fragmento "variable":**
```html
<!-- ejemplo.html -->
<div th:fragment="ex-frag-var(valor)">
    <p>HOLA SOY UN FRAGMENTO XD</p>
    <p th:text="${valor}"></p>
</div>
```

**Como iterar sobre una lista**:

```html
<!-- index.html -->
<!-- codigo HTML del index [...] -->
<div th:each=" elemento : ${lista}">
    <!-- instanciemos fragmentos!! -->
    <div th:replace="~{fragments/ejemplo :: ex-frag-var(${elemento})}"></div>
</div>
<!-- codigo HTML del index [...] -->
```
