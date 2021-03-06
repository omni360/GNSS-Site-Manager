import { browser } from 'protractor';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { TestUtils } from '../utils/test.utils';

describe('SelectSite', () => {
    let selectSitePage: SelectSitePage = new SelectSitePage();

    beforeEach(async () => {
        return await browser.get(selectSitePage.url);
    });

    it('entering search text should return list of sites - one site', () => {
        selectSitePage.searchFor('ade1');
        expect(selectSitePage.selectSiteList.isPresent()).toEqual(true);
        expect(selectSitePage.selectSiteListItems.count()).toEqual(1);
        expect(selectSitePage.selectSiteListItems.first().getText()).toBe('ADE1');
        TestUtils.debug(selectSitePage.selectSiteList);
    });

    it('entering search text but do not click on button should return list of sites - one site', () => {
        selectSitePage.enterSearchText('ade1');
        expect(selectSitePage.selectSiteList.isPresent()).toEqual(true);
        expect(selectSitePage.selectSiteListItems.count()).toEqual(1);
        expect(selectSitePage.selectSiteListItems.first().getText()).toBe('ADE1');
        TestUtils.debug(selectSitePage.selectSiteList);
    });

    it('entering search text should return the specific sites - multiple sites', () => {
        selectSitePage.searchFor('ade');
        expect(selectSitePage.selectSiteList.isPresent()).toEqual(true);
        expect(selectSitePage.selectSiteListItems.count()).not.toBe(0);
        expect(TestUtils.elementArrayContaining(selectSitePage.selectSiteListItems, 'ADE1').count()).toBe(1);
        TestUtils.debugArray(selectSitePage.selectSiteListItems);
    });

    it('selecting a specific site from the list should display the siteLog', () => {
        let siteLogPage: SiteLogPage = selectSitePage.openSite('ADE1');
        expect(siteLogPage.siteInformationHeader.isPresent()).toEqual(true, 'ADE1\'s siteLogPage.siteInformationHeader should exist');
    });

    it('selecting a general site string from the list should display the siteLog', () => {
        selectSitePage.searchFor('ade');
        let siteLogPage: SiteLogPage = selectSitePage.clickOnSite('ade1');
        expect(siteLogPage.siteInformationHeader.isPresent()).toEqual(true, 'ADE1\'s siteLogPage.siteInformationHeader should exist');
    });
});
