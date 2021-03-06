import { ElementArrayFinder, ElementFinder } from 'protractor';
import { promise } from 'selenium-webdriver';
import * as moment from 'moment';

export class TestUtils {
    /**
     * Search for the given searchText in any element's text (content) in the array of elements.  An array is
     * returned from Protractors `element.all(selector)`
     *
     * @param elementArray
     * @param searchText
     * @return {ElementArrayFinder} of the elements in the array with the searchText
     */
    public static elementArrayContaining(elementArray: ElementArrayFinder, searchText: string): ElementArrayFinder {
        return elementArray.filter(function (element: ElementFinder) {
            return element.getText().then((text) => {
                return text.toLowerCase() === searchText.toLowerCase();
            });
        });
    }

    public static debug(element: ElementFinder) {
        element.getInnerHtml().then(
            (successVal) => {
                console.log('BasePage.debug success: ', successVal);
            },
            (failureVal) => {
                console.log('BasePage.debug failure: ', failureVal);
            }
        );
    }

    public static debugArray(elements: ElementArrayFinder) {
        console.log('debugArray - ');
        elements.each(TestUtils.debug);
    }

    /**
     * The given array is of promises.  Resolve those and return as an array of strings of the element.getText()
     * @param array
     * @return
     */
    public static getElementArrayAsList(array: ElementArrayFinder): promise.Promise<string[]> {
        let deferred = promise.defer();
        let out: string[] = new Array<string>();
        array.then((elements) => {
            elements.forEach((element: ElementFinder) => {
                element.getText().then(
                    (text: string) => {
                        if (text.length > 0) {
                            out.push(text);
                        }
                    }
                );
            });
        });
        deferred.fulfill(out);
        return deferred.promise;
    }

    public static getTimeStamp(): string {
        return moment().utc().format('YYYY-MM-DD HH:mm:ss');
    }

    public static checkInputValueEqual(elemFinder: ElementFinder, elemName: string, expectValue: string) {
        elemFinder.getAttribute('value').then((value: string) => {
            console.log('Check if ' + elemName + ' is "' + value + '": ' + (expectValue === value));
            expect(value).toEqual(expectValue);
        });
    }

    public static checkInputValueNotNull(elemFinder: ElementFinder, elemName: string) {
        elemFinder.getAttribute('value').then((value: string) => {
            console.log('Check if ' + elemName + ' is not null (value=' + value + ')');
            expect(value).not.toBe(null);
        });
    }

    public static checkItemCount(elemArrayFinder: ElementArrayFinder, action: string, expectCount: number) {
        elemArrayFinder.count().then((count: number) => {
            console.log('Number of items after ' + action + ': ' + count);
            expect(count).toBe(expectCount);
        });
    }
}
