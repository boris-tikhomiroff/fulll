describe("Github user search e2e", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.get("input").clear();
    cy.get("input").type("fulll");
  });

  describe("Global", () => {
    it("front page can be opened", () => {
      expect(cy.contains("Github Search"));
    });

    it("works well on mobile", () => {
      cy.viewport("iphone-x");
      expect(cy.contains("fulll").should("be.visible"));
    });
  });

  describe("Search features", () => {
    it("displays correct search results", () => {
      cy.contains("fulll");
    });

    it("redirects to user profile on click", () => {
      cy.get('[data-testid="view-profile-fulll"] a')
        .should("have.attr", "href", "https://github.com/fulll")
        .and("have.attr", "target", "_blank")
        .then((link) => {
          const url = link.prop("href");
          // @ts-ignore
          expect(url).to.equal("https://github.com/fulll");
        });
    });

    it("displays error message on failed search", () => {
      cy.get("input").type("kfdsjsdkfjdkljfdlkdsjfflksdj");
      expect(cy.contains("No results found").should("be.visible"));
    });

    it("displays loading state suring the load", () => {
      cy.intercept(
        {
          method: "GET",
          url: "/search*",
        },
        {
          delay: 10000,
          body: {},
        }
      ).as("searchRequest");

      cy.get("input").type("fulll");
      expect(cy.get(".loader").should("be.visible"));
    });
  });

  describe("Edit features", () => {
    it("enables edit mode and shows options", () => {
      cy.get("[title='edit mode']").click();
      cy.get("body").then(($body) => {
        if ($body.find("[title='edit mode']").length > 0) {
          cy.get("[title='copy element']").should("be.visible");
        }
      });
    });

    it("selects and deselects all items", () => {
      cy.get("[title='edit mode']").click();
      cy.get(".checkbox__input").first({ timeout: 20000 }).click({ force: true });

      cy.get(".checkbox__input").first({ timeout: 20000 }).click({ force: true });
    });

    it("duplicates all selected items", () => {
      cy.get("[title='edit mode']").click();
      cy.get(".checkbox__input").first({ timeout: 20000 }).click({ force: true });
      cy.get("[title='copy element']").click();
      cy.get(".user-card").should("have.length.greaterThan", 1);
    });

    it("deletes all selected items", () => {
      cy.get("[title='edit mode']").click();
      cy.get(".checkbox__input").first({ timeout: 20000 }).click({ force: true });

      cy.get("[title='delete element']").click();
      cy.get(".user-card").should("have.length", 0);
    });
  });
});
