<template>
    <Page>
        <ActionBar>
            <Label text="Home"/>
        </ActionBar>

        <FlexboxLayout
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
        >
            <Label class="info">
                <FormattedString>
                    <Span class="fas" text.decode="&#xf135; "/>
                    <Span text="Blank {N}-Vue app"/>
                </FormattedString>
            </Label>

            <Button
                text="Throw exception"
                @tap="throws"
            />

            <Button
                text="Capture exception"
                @tap="capture"
            />

            <Label class="info" textWrap="true">
                <FormattedString>
                    <Span text="Last event ID: "/>
                    <Span :text="lastEventId || 'none'"/>
                </FormattedString>
            </Label>
        </FlexboxLayout>
    </Page>
</template>

<script>
import * as Sentry from '@nativescript-community/sentry'

export default {
    data() {
        return {
            lastEventId: null,
        }
    },
    methods: {
        capture() {
            const error = new Error('A blank error thrown by a button, captured by Sentry')
            this.lastEventId = Sentry.captureException(error)
        },
        throws() {
            throw new Error('A blank error thrown by a button, not captured')
        },
    },
};
</script>

<style scoped lang="scss">
    @import '@nativescript/theme/scss/variables/blue';

    // Custom styles
    .fas {
        @include colorize($color: accent);
    }

    .info {
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
</style>
