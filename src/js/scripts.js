jQuery(document).ready(function ($) {

    "use strict";
    var content = "";
    var lead = "";
    var lower = "";
    // owl setup
    $('.owl-carousel').owlCarousel({
        center: true,
        loop: true,
        margin: 30,
        nav: false,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 6
            }
        }
    });

    // NProgress
    $('body').show();
    NProgress.start();


    // click in replay btn
    $(document).on('click', ".replay-btn", function () {

        // remove all comment form
        $(this).closest('.comment').siblings(".comment-form").remove();
        $(this).closest('.replay').siblings(".comment-form").remove();

        const username = $(this).data('user');
        const type = $(this).data('type');
        const replay = `<section class="comment-form" style="margin-left:3rem;margin-top:1rem; border-color:#645beb">
            <div class="container">
                <div class="participate">
                    <img src="dest/images/lary-avatar.svg" alt="participate image" width="40" height="40">
                    <h2>Want to participate?</h2>
                </div>
                <form action="" class="mt-2">
                    <div class="form-floating">
                        <textarea class="form-control" style="height: 65px;" placeholder="Leave a comment here"
                            id="floatingTextarea2"> ${username} </textarea>
                        <label for="floatingTextarea2">Quick, thing of something to say!</label>
                    </div>
                    <hr>
                    <div class="button">
                        <button type="submit" class="btn"> <i class="fas fa-reply"></i> Replay</button>
                        <button id="close-btn" type="button" class="btn close"><i class="fas fa-times"></i> Cancel</button>
                    </div>
                </form>
            </div>
    </section>`;

        // check the type if is replay on comment or replay on replay
        if (type == 'comment')
            $(this).closest('.comment').after(replay);

        else
            $(this).closest('.replay').after(replay);

    });

    // click in edit btn
    $(document).on('click', '.actions .edit-btn', function () {

        // remove the all edit form
        $(this).toggleClass('disabled');
        
        // call cancel before
        $(".cancelEdit").click();

        lead = $(this).parent().siblings(".information").find(".lead");
        lower = $(this).parent().siblings(".information").find(".lower");
        content = lead.text();

        const form = `
        <form id="editForm" class="mt-2 mb-2">
            <textarea class="form-control" id="dynamicFocus" style="height:100px">${content}</textarea>

            <button type="submit" class="btn btn-primary" style="float: right;
            font-size: .85rem;
            padding: 5px 10px 5px 10px;
            line-height: initial;
            margin-left: 0.45rem;
            margin-top: 10px;"><i class="fas fa-save"></i> save</button>

            <button type="button" class="btn btn-danger cancelEdit" style="float: right;
            font-size: .85rem;
            padding: 5px 10px 5px 10px;
            line-height: initial;
            margin-top: 10px;"><i class="fas fa-times"></i> cancel</button>
        </form>
        
        `;

        // make textarea focus
        $(document).ready(function () {
            $("#dynamicFocus").focus();
        });

        // remove the lead class and lower buttons
        lead.toggleClass("d-none");
        lower.toggleClass("d-none");

        // append the new form
        $(this).parent().siblings(".information").append(form);

    });

    // cancel edit comment or replay
    $(document).on('click', '.cancelEdit', function () {
        
        // get the edit btn to remove the disabled class
        $(this).parent().parent().siblings(".actions").find('.edit-btn').toggleClass('disabled');

        // delete the form without take the new value from textarea
        $("#editForm").remove();

        // get the lead class and lower buttons
        lead.toggleClass("d-none");
        lower.toggleClass("d-none");

        
    });

    // close buttons
    $(document).on('click', '#close-btn', function () {
        $('.comments').find('.comment-form').remove();
    });
});

$(window).on('load', function () {
    setTimeout(function () {
        NProgress.done()
    }, 2000);
});