

module.exports = class Doctor {
    constructor(arztnr, fullname, strasnr, telenr, sprechzeiten) {
        this.arztnr = arztnr;
        this.fullname = fullname;
        this.strasnr = strasnr;
        this.telenr = telenr;
        this.sprechzeiten = sprechzeiten;
    }
}
