interface SignalR
{
    companiesHub: CompaniesHubConnection;
    booksHub: BooksHubConnection;
    bookMetadatasHub: BookPagingHubConnection;
    dropboxHub: DropboxConnection;
    importedBooksHub: ImportedBooksConnection;
}
interface ImportedBooksConnection extends ServerClientHubConnection<ImportedBooksServerMethods, ImportedBooksClientCallbacks>
{
}
interface BooksHubConnection extends ServerClientHubConnection<BooksHubServerMethods, BooksHubClientCallbacks>
{
}
interface CompaniesHubConnection extends ServerClientHubConnection<CompaniesHubServerMethods, CompaniesHubClientCallbacks>
{
}
interface BookPagingHubConnection extends ServerClientHubConnection<BookMetadataHubServerMethods, BookMetadataHubClientCallbacks>
{
}
interface DropboxConnection extends ServerClientHubConnection<DropboxHubServerMethods, DropboxHubClientCallbacks>
{
}

interface ServerClientHubConnection<TServer, TClient> extends HubConnection
{
    server: TServer;
    client: TClient;
}

interface BaseHubClientCallbacks
{
    onError(message: string): void;
}

interface HubWithLongTermClientCallbacks extends BaseHubClientCallbacks
{
    onLongTermOperationStarted(): void;
    onLongTermOperationFinished(): void;
}

interface BooksHubServerMethods
{
    makeContentfullPage(pageIndex: number, bookID: string): void;
    makeContentlessPage(pageIndex: number, bookID: string): void;
    openBook(bookID: string): void;
    getBooksList(): void;
    createBook(creationInfo: IBookCreationInfo, config): void;
    updateBook(book: IBookDto): void;
    persistCurrentState(): void;
    setBookLockState(isLocked: boolean, id: string): void;
    setBookArrangeAbilityState(isRearrangeable: boolean, id: string): void;
}
interface ImportedBooksClientCallbacks extends HubWithLongTermClientCallbacks
{
    onBooksLoaded(booksList: IImportedBook[]): void;
}
interface BooksHubClientCallbacks extends HubWithLongTermClientCallbacks
{
    onTogglePageContentlessComplete(): void;
    onTogglePageContentlessImposible(): void;
    onCurrentStatePersistingStarted(): void;
    onCurrentStatePersistingFinished(): void;
    onBookOpened(book: IBookDto): void;
    onBooksLoaded(books: IBookDto[]): void;
    onBookCreated(book: IBookDto): void;
    onBookUpdated(book: IBookDto): void;
    onBookArrangeAbilityStateChanged: (isRearrangeable: boolean, bookID: string) => void;
    onBookLockStateChanged: (isLocked: boolean, bookID: string) => void;
}
interface CompaniesHubClientCallbacks extends HubWithLongTermClientCallbacks
{
    onFavoritesLoaded: (bookID: string, favorites: IMap<string>) => void;
    onOwnerIndexLoaded: (imageID: string, ownerPageIndex: number) => void;
    onPageDataLoaded: (results: IContractBase[][]) => void;
    onFreeBusinessSavedCompletely: (contract: IFreeBusinessContract) => void;
    onFreeBusinessRemovedCompletely: (contract: IFreeBusinessContract) => void;
    onPaidBusinessRemovedCompletely: (contract: IPaidBusinessContract, contacts: IContactContract[]) => void;
    onPaidBusinessSavedCompletely: (contract: IPaidBusinessContract, contacts: IContactContract[]) => void;
    onCategorySavedCompletely: (contract: ICategoryContract) => void;
    onCategoryRemovedCompletely: (contract: ICategoryContract) => void;
    onAreaSavedCompletely: (contract: IAreaContract) => void;
    onAreaRemovedCompletely: (contract: IAreaContract) => void;

    onFavoriteSavedCompletely: (contract: IFavoriteBusinessContract) => void;
    onFavoriteRemovedCompletely: (contract: IFavoriteBusinessContract) => void;
    //onTotalCompaniesCalculated: (count: number) => void;
    onImageSavedCompletely: (img: IImageContract) => void;
    onImageRemovedCompletely: (img: IImageContract) => void;

    onItemsMoved: (movedItem: IContractBase, shiftedItems: IContractBase[]) => void;
    onImagePlaced: () => void;
    onMetadataNotFound: () => void;
    onImagePinned: (img: IImageContract) => void;
    onSrcChanged: (img: IImageContract) => void;
    onImageUploaded: (img: IImageContract) => void;
    onAdvertisingTextResponse: (text: string, businessID: string, bookID: string) => void;
    onContentlessPagesShifted: (pagesMap: number[]) => void;
    onItemDragged: (draggedItemID: string) => void;
}
interface ImportedBooksServerMethods
{
    loadAll(): void;
}
interface CompaniesHubServerMethods
{
    getOwnerIndex(ownerID: string): void;
    pinWideImage(img: IImageContract, pageIndex: number, position: RecordPinPosition, pinIndex: number): void;
    loadData(request: ICompaniesPartRequest): void;
    saveFavoriteBusiness(contract: IFavoriteBusinessContract, bookID: string): void;
    removeFavoriteBusiness(contract: IFavoriteBusinessContract, bookID: string): void;

    saveFreeBusiness(contract: IFreeBusinessContract, bookID: string): void;
    removeFreeBusiness(contract: IFreeBusinessContract, bookID: string): void;

    savePaidBusiness(business: IPaidBusinessContract, contacts: IContactContract[], bookID: string): void;
    removePaidBusiness(business: IPaidBusinessContract, contacts: IContactContract[], bookID: string): void;

    saveCategory(contract: ICategoryContract, bookID: string): void;
    removeCategory(contract: ICategoryContract, bookID: string): void;

    saveArea(contract: IAreaContract, bookID: string): void;
    removeArea(contract: IAreaContract, bookID: string): void;
    //getTotalCompaniesCount(bookSettingsID: number, domainID: number): void;
    removeImage(imageContract: IImageContract, id: string);
    saveImage(imageContract: IImageContract, id: string);
    moveItem(groupId: string, newIndex: number, oldIndex: number, bookID: string): void;
    placeImage(startIndex: number, bookID: string, imageContract: IImageContract, position: RecordPinPosition, pageIndex: number, pinIndex: number): void;
    putToDropbox(bookID: string, image: IImageContract): void;
    changeSrc(imageContract: IImageContract, base64Src: string): void;
    createNewImage(id: string, base64Img: string, assetTypes: AssetTypes, ownerID: string, uploadFileName: string): void;
    getAdvertisingLocationText(businessID: string, bookID: string): void;
    getFavorites(bookID: string): void;
    dragItem(bookID: string, curID: string, prevID: string, nextID: string): void;
}


interface BookMetadataHubServerMethods
{
    getMetadata(bookID): void;
    completeMetadataCreation(contracts: ICorrectionInfoDto[], bookId): void;
    removeMetadata(metaID: string): void;
    createMetadata(id: string, withUnpin?: boolean): void;
}
interface BookMetadataHubClientCallbacks extends HubWithLongTermClientCallbacks
{
    onMetadataLoaded(info: IBookMetadataDto): void;
    onMetadataCreated(meta: IBookMetadataDto, problematicRecords: IContractBase[]);
    onMetadataRemovedCompletely(meta: IBookMetadataDto): void;
    onMetadataCreatedCompletelly: (meta: IBookMetadataDto) => void;
}
interface DropboxHubServerMethods
{
    getItems(bookID: string): void;
}
interface DropboxHubClientCallbacks extends BaseHubClientCallbacks
{
    onItemsLoaded(items: IBookDropboxItemDto[]): void;
}