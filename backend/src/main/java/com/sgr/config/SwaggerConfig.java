package com.sgr.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.common.base.Predicates;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
	/* http://localhost:9999/swagger-ui.html */
	@Bean
	public Docket postsApi() {
		return new Docket(DocumentationType.SWAGGER_2)
				.select()
				.apis(RequestHandlerSelectors.basePackage("com.sgr"))
				.paths(PathSelectors.any())
				.paths(Predicates.not(PathSelectors.regex("/error.*")))
				.build();
	}



//	 @Bean
//    public Docket postsApi() {
//       return new Docket(DocumentationType.SWAGGER_2)
//             .groupName("ssafywebblog")
//             .apiInfo(apiInfo())
//             .select()
//             .apis(RequestHandlerSelectors.basePackage("com.web.blog.controller"))
//             .paths(PathSelectors.ant("/api/**"))
//             .build();
//    }
//
//  
//
//    private ApiInfo apiInfo() {
//       return new ApiInfoBuilder().title("SSAFY API")
//             .description("SSAFY API Reference for Developers")
//             .termsOfServiceUrl("https://edu.ssafy.com")
//             .license("SSAFY License")
//             .licenseUrl("ssafy@ssafy.com").version("1.0").build();
//    }
}
