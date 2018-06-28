/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    // Test Suite - RSS Feeds
    describe('RSS Feeds', function() {
        // test to make sure that the allFeeds variable has been defined and that it is not empty. 
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // test that loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
        it('has URL', function() {
            allFeeds.forEach(function(thisFeed) {
                expect(thisFeed.url).toBeDefined();
                expect(thisFeed.url.length).not.toBe(0);
            });
        });

        // test that loops through each feed in the allFeeds object and ensures it has a name defined
        // and that the name is not empty.
         it('has name', function() {
            allFeeds.forEach(function(thisFeed) {
                expect(thisFeed.name).toBeDefined();
                expect(thisFeed.name.length).not.toBe(0);
            });
         });
    });


    /* Test Suite - The menu */
    describe('The menu', function() {
        // test that ensures the menu element is hidden by default. 
         it('has menu element hidden by default', function() {
            expect(document.querySelector('body.menu-hidden')).toBeTruthy();
         });

         // test that ensures the menu changes visibility when the menu icon is clicked. 
          it('changes visibility when menu icon clicked', function() {
            // click menu icon
            document.getElementsByClassName('menu-icon-link')[0].click();

            // make sure menu displayed
            expect(document.querySelector('body.menu-hidden')).toBeFalsy();

            // click menu icon again
            document.getElementsByClassName('menu-icon-link')[0].click();

            // now make sure menu is hidden again
            expect(document.querySelector('body.menu-hidden')).toBeTruthy();
          });
     });

    // Test suite - Initial Entries
    describe ('Initial Entries', function() {
        // test that ensures when the loadFeed function is called and completes its work, there is at least
        // a single .entry element within the .feed container.
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('should have at least one entry in the feed', function(done) {
            expect(document.querySelector('.feed').getElementsByClassName('entry').length).toBeGreaterThan(0);
            done();
        });
    });

    // Test suite - New Feed Selection
    describe ('New Feed Selection', function() {
        // test that ensures when a new feed is loaded by the loadFeed function that the content actually changes.
         let oldFeed;
         let newFeed;

         beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeed = document.querySelector('.feed').innerHTML;
                loadFeed(1, function() {
                    newFeed = document.querySelector('.feed').innerHTML;
                    done();
                });
            });
         });

         // compare old feed with new feed to make sure they are not the same
         it('content changes on every load', function(done) {
            expect(newFeed).not.toEqual(oldFeed);
            done();
         });
    });
}());
